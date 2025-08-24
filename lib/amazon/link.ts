/**
 * Amazon Affiliate Link Builder
 * Generates compliant affiliate URLs with proper rel attributes
 */

import type { AmazonMarket } from '../types/amazon'

interface MarketConfig {
  storefront: string
  partnerTag: string
}

/**
 * Get market configuration from environment variables
 */
function getMarketConfig(market: AmazonMarket): MarketConfig {
  const markets: Record<AmazonMarket, { storefront: string }> = {
    DE: { storefront: 'www.amazon.de' },
    US: { storefront: 'www.amazon.com' },
    UK: { storefront: 'www.amazon.co.uk' }
  }

  const partnerTag = process.env[`AMAZON_TAG_${market}`]
  
  if (!partnerTag) {
    throw new Error(`Missing partner tag for market ${market}. Set AMAZON_TAG_${market} in environment variables.`)
  }

  return {
    storefront: markets[market].storefront,
    partnerTag
  }
}

/**
 * Build Amazon affiliate URL with proper parameters
 * 
 * @param asin - Amazon Standard Identification Number
 * @param market - Target market (DE, US, UK)
 * @param ascsubtag - Optional campaign/sub-ID tracking parameter
 * @returns Complete affiliate URL with tracking parameters
 */
export function buildAffiliateUrl(
  asin: string,
  market: AmazonMarket,
  ascsubtag?: string
): string {
  if (!asin || !/^[A-Z0-9]{10}$/.test(asin)) {
    throw new Error('Invalid ASIN format. Must be 10 alphanumeric characters.')
  }

  const config = getMarketConfig(market)
  const url = new URL(`https://${config.storefront}/dp/${asin}`)
  
  // Add partner tag for affiliate tracking
  url.searchParams.set('tag', config.partnerTag)
  
  // Add optional sub-ID for campaign tracking
  if (ascsubtag) {
    url.searchParams.set('ascsubtag', ascsubtag)
  }
  
  return url.toString()
}

/**
 * Build short product URL without affiliate parameters
 * Useful for display purposes or non-monetized links
 * 
 * @param asin - Amazon Standard Identification Number  
 * @param market - Target market
 * @returns Clean product URL
 */
export function buildProductUrl(asin: string, market: AmazonMarket): string {
  if (!asin || !/^[A-Z0-9]{10}$/.test(asin)) {
    throw new Error('Invalid ASIN format. Must be 10 alphanumeric characters.')
  }

  const config = getMarketConfig(market)
  return `https://${config.storefront}/dp/${asin}`
}

/**
 * Extract ASIN from Amazon URL
 * Supports various Amazon URL formats
 * 
 * @param url - Amazon product URL
 * @returns ASIN if found, null otherwise
 */
export function extractASIN(url: string): string | null {
  try {
    const patterns = [
      // Standard product URLs: /dp/ASIN, /gp/product/ASIN
      /\/(?:dp|gp\/product)\/([A-Z0-9]{10})/,
      // Search result URLs: /ASIN/
      /\/([A-Z0-9]{10})\//,
      // Query parameter: ?asin=ASIN
      /[?&]asin=([A-Z0-9]{10})/i
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }

    return null
  } catch {
    return null
  }
}

/**
 * Validate ASIN format
 * 
 * @param asin - Amazon Standard Identification Number
 * @returns True if valid ASIN format
 */
export function isValidASIN(asin: string): boolean {
  return typeof asin === 'string' && /^[A-Z0-9]{10}$/.test(asin)
}

/**
 * Get market from URL or locale
 * 
 * @param input - URL string or locale code
 * @returns Detected market or null
 */
export function detectMarket(input: string): AmazonMarket | null {
  const marketPatterns: Record<string, AmazonMarket> = {
    'amazon.de': 'DE',
    'amazon.com': 'US', 
    'amazon.co.uk': 'UK',
    'de-DE': 'DE',
    'en-US': 'US',
    'en-GB': 'UK'
  }

  for (const [pattern, market] of Object.entries(marketPatterns)) {
    if (input.includes(pattern)) {
      return market
    }
  }

  return null
}

/**
 * Generate campaign tracking sub-ID
 * 
 * @param source - Traffic source (e.g., 'blog', 'tutorial')
 * @param campaign - Campaign identifier
 * @param content - Content identifier (optional)
 * @returns Formatted ascsubtag value
 */
export function generateSubTag(
  source: string,
  campaign: string,
  content?: string
): string {
  const parts = [source, campaign]
  if (content) {
    parts.push(content)
  }
  
  return parts
    .map(part => part.replace(/[^a-zA-Z0-9-_]/g, ''))
    .join('_')
    .slice(0, 50) // Amazon limit
}