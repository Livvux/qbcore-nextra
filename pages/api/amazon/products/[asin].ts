/**
 * Amazon Product API Route
 * Server-only with Node.js runtime for SigV4 support
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import { getProduct } from '../../../../lib/amazon/api-client'
import { rateLimitedRequest } from '../../../../lib/amazon/rate-limiter'
import { logError } from '../../../../lib/amazon/logger'
import type { AmazonMarket, AmazonProduct } from '../../../../lib/types/amazon'

// CRITICAL: Force Node.js runtime for crypto operations
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface APIResponse {
  product?: AmazonProduct
  error?: string
  cached?: boolean
}

/**
 * Get market from request headers or query params
 */
function getMarketFromRequest(req: NextApiRequest): AmazonMarket {
  const markets = ['DE', 'US', 'UK'] as const
  
  // Check query parameter first
  const marketQuery = req.query.market as string
  if (marketQuery && markets.includes(marketQuery as AmazonMarket)) {
    return marketQuery as AmazonMarket
  }
  
  // Check Accept-Language header
  const acceptLanguage = req.headers['accept-language'] || ''
  if (acceptLanguage.includes('de')) return 'DE'
  if (acceptLanguage.includes('en-GB')) return 'UK'
  if (acceptLanguage.includes('en')) return 'US'
  
  // Default to DE
  return 'DE'
}

/**
 * Validate ASIN format
 */
function isValidASIN(asin: string): boolean {
  return typeof asin === 'string' && /^[A-Z0-9]{10}$/.test(asin)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  const { asin } = req.query
  
  // Validate ASIN
  if (!asin || typeof asin !== 'string' || !isValidASIN(asin)) {
    return res.status(400).json({ 
      error: 'Invalid ASIN. Must be 10 alphanumeric characters.' 
    })
  }

  const market = getMarketFromRequest(req)
  const requestKey = `${asin}:${market}`

  try {
    // Use rate limiter to prevent API abuse
    const product = await rateLimitedRequest(
      requestKey,
      () => getProduct(asin, market),
      market
    )

    if (!product) {
      return res.status(404).json({ 
        error: 'Product not found or unavailable' 
      })
    }

    // Check if data is stale
    const staleThreshold = parseInt(process.env.AMAZON_STALE_THRESHOLD_MS || '86400000')
    const isStale = product.offerAgeMs > staleThreshold

    // Set appropriate cache headers
    const cacheControl = isStale 
      ? 'public, s-maxage=300, stale-while-revalidate=3600' // 5 min cache if stale
      : 'public, s-maxage=3600, stale-while-revalidate=7200' // 1 hour cache if fresh

    res.setHeader('Cache-Control', cacheControl)
    res.setHeader('Vary', 'Accept-Language')

    // Add CORS headers for client-side usage
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept-Language')

    return res.status(200).json({ 
      product,
      cached: product.offerAgeMs > 0
    })

  } catch (error) {
    logError(error instanceof Error ? error : new Error(String(error)), {
      asin,
      market,
      method: req.method,
      userAgent: req.headers['user-agent']
    })

    // Don't expose internal error details to client
    const errorMessage = error instanceof Error && error.message.includes('Rate limited')
      ? 'Service temporarily unavailable. Please try again later.'
      : 'Failed to fetch product information'

    return res.status(500).json({ error: errorMessage })
  }
}