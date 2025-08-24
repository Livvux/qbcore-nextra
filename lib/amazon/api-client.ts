/**
 * Amazon Product Advertising API v5 Client
 * Server-only implementation with AWS Signature Version 4
 */

import { createHash, createHmac } from 'crypto'
import type { 
  AmazonProduct, 
  AmazonMarket, 
  PAAPIResponse, 
  PAAPIItem,
  AmazonMarketConfig 
} from '../types/amazon'
import { buildAffiliateUrl } from './link'
import { getCached, setCached, buildProductCacheKey } from './cache'
import { logAPICall } from './logger'
import { getMockProduct, shouldUseMockData } from './mock-data'

/**
 * Get market configuration from environment
 */
function getMarketConfig(market: AmazonMarket): AmazonMarketConfig {
  const host = process.env[`AMAZON_HOST_${market}`]
  const region = process.env[`AMAZON_REGION_${market}`]
  const partnerTag = process.env[`AMAZON_TAG_${market}`]
  
  if (!host || !region || !partnerTag) {
    throw new Error(`Missing configuration for market ${market}`)
  }

  const storefronts = {
    DE: 'www.amazon.de',
    US: 'www.amazon.com', 
    UK: 'www.amazon.co.uk'
  }

  return {
    host,
    region,
    partnerTag,
    storefront: storefronts[market]
  }
}

/**
 * Create AWS Signature Version 4
 */
function createSignature(
  method: string,
  uri: string,
  querystring: string,
  headers: Record<string, string>,
  payload: string,
  accessKey: string,
  secretKey: string,
  region: string,
  service: string = 'ProductAdvertisingAPI'
): string {
  const algorithm = 'AWS4-HMAC-SHA256'
  const date = headers['x-amz-date']
  const dateStamp = date.slice(0, 8)
  
  // Create canonical request
  const canonicalHeaders = Object.keys(headers)
    .sort()
    .map(key => `${key.toLowerCase()}:${headers[key]}`)
    .join('\\n') + '\\n'
    
  const signedHeaders = Object.keys(headers)
    .sort()
    .map(key => key.toLowerCase())
    .join(';')
    
  const payloadHash = createHash('sha256').update(payload).digest('hex')
  
  const canonicalRequest = [
    method,
    uri,
    querystring,
    canonicalHeaders,
    signedHeaders,
    payloadHash
  ].join('\\n')
  
  // Create string to sign
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`
  const stringToSign = [
    algorithm,
    date,
    credentialScope,
    createHash('sha256').update(canonicalRequest).digest('hex')
  ].join('\\n')
  
  // Create signing key
  const kDate = createHmac('sha256', `AWS4${secretKey}`).update(dateStamp).digest()
  const kRegion = createHmac('sha256', kDate).update(region).digest()
  const kService = createHmac('sha256', kRegion).update(service).digest()
  const kSigning = createHmac('sha256', kService).update('aws4_request').digest()
  
  // Create signature
  const signature = createHmac('sha256', kSigning).update(stringToSign).digest('hex')
  
  return `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`
}

/**
 * Make PA API request with signature
 */
async function makeAPIRequest(
  market: AmazonMarket,
  operation: string,
  payload: any
): Promise<PAAPIResponse> {
  const startTime = Date.now()
  
  try {
    const config = getMarketConfig(market)
    const accessKey = process.env.AMAZON_ACCESS_KEY!
    const secretKey = process.env.AMAZON_SECRET_KEY!
    
    if (!accessKey || !secretKey) {
      throw new Error('Missing Amazon API credentials')
    }

    const host = config.host
    const uri = '/paapi5/getitems'
    const method = 'POST'
    const service = 'ProductAdvertisingAPI'
    const region = config.region
    
    const now = new Date()
    const amzDate = now.toISOString().replace(/[:-]|\\.\\d{3}/g, '')
    
    const headers = {
      'content-type': 'application/json; charset=utf-8',
      'host': host,
      'x-amz-date': amzDate,
      'x-amz-target': `com.amazon.paapi5.v1.ProductAdvertisingAPIv1.${operation}`
    }
    
    const payloadString = JSON.stringify(payload)
    const authorization = createSignature(
      method, uri, '', headers, payloadString, 
      accessKey, secretKey, region, service
    )
    
    const response = await fetch(`https://${host}${uri}`, {
      method,
      headers: {
        ...headers,
        'Authorization': authorization
      },
      body: payloadString
    })
    
    const responseTime = Date.now() - startTime
    
    if (!response.ok) {
      logAPICall(response.status, market, undefined, responseTime)
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('retry-after')
        throw new Error(`Rate limited. Retry after: ${retryAfter}s`)
      }
      
      const errorText = await response.text()
      throw new Error(`PA API error: ${response.status} - ${errorText}`)
    }
    
    const data = await response.json()
    logAPICall(200, market, undefined, responseTime)
    
    return data
  } catch (error) {
    const responseTime = Date.now() - startTime
    logAPICall(0, market, error instanceof Error ? error.message : 'unknown', responseTime)
    throw error
  }
}

/**
 * Map PA API response to our product type
 */
function mapAPIResponse(
  item: PAAPIItem, 
  market: AmazonMarket
): AmazonProduct | null {
  try {
    if (!item.ASIN) return null
    
    const title = item.ItemInfo?.Title?.DisplayValue
    if (!title) return null
    
    const brand = item.ItemInfo?.ByLineInfo?.Brand?.DisplayValue
    const imageUrl = item.Images?.Primary?.Medium?.URL
    
    let offer = undefined
    const listing = item.Offers?.Listings?.[0]
    if (listing?.Price) {
      offer = {
        amount: listing.Price.Amount,
        currency: listing.Price.Currency,
        display: listing.Price.DisplayAmount
      }
    }
    
    const availability = listing?.Availability?.Message
    const affiliateUrl = buildAffiliateUrl(item.ASIN, market)
    const lastFetched = new Date().toISOString()
    
    return {
      asin: item.ASIN,
      title,
      brand,
      imageUrl,
      offer,
      availability,
      affiliateUrl,
      lastFetched,
      offerAgeMs: 0, // Fresh data
      market
    }
  } catch (error) {
    console.error('Error mapping API response:', error)
    return null
  }
}

/**
 * Get product by ASIN with caching
 */
export async function getProduct(
  asin: string,
  market: AmazonMarket = 'DE'
): Promise<AmazonProduct | null> {
  // Use mock data in development or when configured
  if (shouldUseMockData()) {
    console.log(`Using mock data for ASIN: ${asin}`)
    return getMockProduct(asin, market)
  }
  
  // Check cache first
  const cacheKey = buildProductCacheKey(asin, market)
  const cached = await getCached<AmazonProduct>(cacheKey)
  
  try {
    if (cached) {
      // Update offer age
      const now = Date.now()
      const fetchTime = new Date(cached.lastFetched).getTime()
      cached.offerAgeMs = now - fetchTime
      
      // Return cached data if still fresh (within 24 hours)
      const staleThreshold = parseInt(process.env.AMAZON_STALE_THRESHOLD_MS || '86400000')
      if (cached.offerAgeMs < staleThreshold) {
        return cached
      }
    }
    
    // Fetch from API
    const config = getMarketConfig(market)
    const payload = {
      ItemIds: [asin],
      PartnerTag: config.partnerTag,
      PartnerType: 'Associates',
      Marketplace: `www.amazon.${market === 'UK' ? 'co.uk' : market.toLowerCase()}`,
      Resources: [
        'Images.Primary.Medium',
        'ItemInfo.Title',
        'ItemInfo.ByLineInfo',
        'Offers.Listings.Price',
        'Offers.Listings.Availability'
      ]
    }
    
    const response = await makeAPIRequest(market, 'GetItems', payload)
    
    if (!response.ItemsResult?.Items?.[0]) {
      // Fallback to mock data if API fails
      console.log(`API returned no data, falling back to mock for ASIN: ${asin}`)
      return getMockProduct(asin, market)
    }
    
    const product = mapAPIResponse(response.ItemsResult.Items[0], market)
    
    if (product) {
      // Cache for 24 hours (PA API compliance)
      const ttl = parseInt(process.env.AMAZON_CACHE_TTL_SECONDS || '86400')
      await setCached(cacheKey, product, ttl)
    }
    
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    
    // Return stale cache data if available as fallback
    if (cached) {
      const now = Date.now()
      const fetchTime = new Date(cached.lastFetched).getTime()
      cached.offerAgeMs = now - fetchTime
      return cached
    }
    
    // Final fallback to mock data
    console.log(`All methods failed, using mock data for ASIN: ${asin}`)
    return getMockProduct(asin, market)
  }
}

/**
 * Get multiple products by ASINs
 */
export async function getProducts(
  asins: string[],
  market: AmazonMarket = 'DE'
): Promise<AmazonProduct[]> {
  // PA API supports up to 10 items per request
  const batchSize = 10
  const results: AmazonProduct[] = []
  
  for (let i = 0; i < asins.length; i += batchSize) {
    const batch = asins.slice(i, i + batchSize)
    const batchResults = await Promise.all(
      batch.map(asin => getProduct(asin, market))
    )
    
    results.push(...batchResults.filter(Boolean) as AmazonProduct[])
    
    // Rate limiting: 1 request per second
    if (i + batchSize < asins.length) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
  
  return results
}