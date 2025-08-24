/**
 * Amazon PA API Rate Limiter
 * Implements token bucket algorithm with per-ASIN deduplication
 */

import type { RateLimitConfig, AmazonMarket } from '../types/amazon'
import { logRateLimit } from './logger'

interface TokenBucket {
  tokens: number
  lastRefill: number
  capacity: number
  refillRate: number
}

interface InflightRequest<T> {
  promise: Promise<T>
  createdAt: number
}

// Token bucket for rate limiting
const tokenBucket: TokenBucket = {
  tokens: 1,
  lastRefill: Date.now(),
  capacity: 1,
  refillRate: 1000 // 1 token per second
}

// In-flight request deduplication
const inflightRequests = new Map<string, InflightRequest<any>>()

// Request queue for when rate limited
const requestQueue: Array<{
  fn: () => Promise<any>
  resolve: (value: any) => void
  reject: (error: any) => void
  key: string
  createdAt: number
}> = []

/**
 * Get rate limit configuration from environment
 */
function getRateLimitConfig(): RateLimitConfig {
  return {
    limit: parseInt(process.env.AMAZON_API_RATE_LIMIT || '1'),
    interval: parseInt(process.env.AMAZON_API_RATE_INTERVAL || '1000'),
    maxRetries: parseInt(process.env.AMAZON_MAX_RETRIES || '3'),
    retryDelay: parseInt(process.env.AMAZON_RETRY_DELAY || '2000')
  }
}

/**
 * Refill token bucket based on time elapsed
 */
function refillBucket(): void {
  const now = Date.now()
  const timePassed = now - tokenBucket.lastRefill
  const tokensToAdd = Math.floor(timePassed / tokenBucket.refillRate)
  
  if (tokensToAdd > 0) {
    tokenBucket.tokens = Math.min(
      tokenBucket.capacity,
      tokenBucket.tokens + tokensToAdd
    )
    tokenBucket.lastRefill = now
  }
}

/**
 * Check if request can proceed (has tokens)
 */
function hasToken(): boolean {
  refillBucket()
  return tokenBucket.tokens > 0
}

/**
 * Consume a token
 */
function consumeToken(): boolean {
  refillBucket()
  if (tokenBucket.tokens > 0) {
    tokenBucket.tokens--
    return true
  }
  return false
}

/**
 * Clean up expired in-flight requests
 */
function cleanupInflightRequests(): void {
  const now = Date.now()
  const maxAge = 60000 // 1 minute
  
  for (const [key, request] of inflightRequests.entries()) {
    if (now - request.createdAt > maxAge) {
      inflightRequests.delete(key)
    }
  }
}

/**
 * Process queued requests when tokens become available
 */
function processQueue(): void {
  if (requestQueue.length === 0) return
  
  const processed: string[] = []
  
  while (requestQueue.length > 0 && hasToken()) {
    const request = requestQueue.shift()
    if (!request) break
    
    if (consumeToken()) {
      // Execute the request
      request.fn()
        .then(request.resolve)
        .catch(request.reject)
        .finally(() => {
          // Remove from in-flight after completion
          inflightRequests.delete(request.key)
        })
      
      processed.push(request.key)
    }
  }
  
  if (processed.length > 0) {
    console.log(`Processed ${processed.length} queued requests`)
  }
}

/**
 * Rate-limited request executor with deduplication
 * 
 * @param key - Unique key for request deduplication (usually ASIN + market)
 * @param fn - Function to execute
 * @param market - Target market for logging
 * @returns Promise resolving to function result
 */
export async function rateLimitedRequest<T>(
  key: string,
  fn: () => Promise<T>,
  market: AmazonMarket
): Promise<T> {
  // Clean up old requests periodically
  cleanupInflightRequests()
  
  // Check if same request is already in flight
  const existing = inflightRequests.get(key)
  if (existing) {
    console.log(`Deduplicating request for key: ${key}`)
    return existing.promise as Promise<T>
  }
  
  return new Promise<T>((resolve, reject) => {
    const executeRequest = async (): Promise<T> => {
      const config = getRateLimitConfig()
      let retries = 0
      
      while (retries <= config.maxRetries) {
        try {
          const result = await fn()
          return result
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error)
          
          // Handle rate limiting
          if (errorMessage.includes('Rate limited') || errorMessage.includes('429')) {
            logRateLimit(market, undefined, requestQueue.length)
            
            if (retries < config.maxRetries) {
              const delay = config.retryDelay * Math.pow(2, retries) // Exponential backoff
              console.log(`Rate limited, retrying in ${delay}ms (attempt ${retries + 1}/${config.maxRetries})`)
              await new Promise(resolve => setTimeout(resolve, delay))
              retries++
              continue
            }
          }
          
          // Handle quota exceeded
          if (errorMessage.includes('RequestQuotaExceeded')) {
            logRateLimit(market, '3600', requestQueue.length) // Quota resets hourly
            throw new Error('Request quota exceeded. Try again in 1 hour.')
          }
          
          throw error
        }
      }
      
      throw new Error(`Max retries (${config.maxRetries}) exceeded`)
    }
    
    // Check if we can execute immediately
    if (consumeToken()) {
      const promise = executeRequest()
      
      // Store in-flight request for deduplication
      inflightRequests.set(key, {
        promise,
        createdAt: Date.now()
      })
      
      promise
        .then(resolve)
        .catch(reject)
        .finally(() => {
          inflightRequests.delete(key)
          // Process any queued requests
          setTimeout(processQueue, 0)
        })
    } else {
      // Queue the request
      console.log(`Queueing request for key: ${key}`)
      requestQueue.push({
        fn: executeRequest,
        resolve,
        reject,
        key,
        createdAt: Date.now()
      })
      
      logRateLimit(market, undefined, requestQueue.length)
      
      // Try to process queue after token refill time
      setTimeout(processQueue, tokenBucket.refillRate)
    }
  })
}

/**
 * Get rate limiter statistics
 */
export function getRateLimiterStats(): {
  tokens: number
  capacity: number
  queueLength: number
  inflightCount: number
} {
  refillBucket()
  
  return {
    tokens: tokenBucket.tokens,
    capacity: tokenBucket.capacity,
    queueLength: requestQueue.length,
    inflightCount: inflightRequests.size
  }
}

/**
 * Clear all queued requests (for testing/emergency)
 */
export function clearQueue(): void {
  requestQueue.length = 0
  inflightRequests.clear()
  console.log('Rate limiter queue cleared')
}

/**
 * Reset rate limiter state (for testing)
 */
export function resetRateLimiter(): void {
  tokenBucket.tokens = tokenBucket.capacity
  tokenBucket.lastRefill = Date.now()
  requestQueue.length = 0
  inflightRequests.clear()
}