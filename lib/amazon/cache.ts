/**
 * Amazon Product Cache Layer
 * Compliant with PA API 24-hour caching requirements
 */

import type { CacheEntry } from '../types/amazon'

// In-memory cache for development
// In production, use Redis, Vercel KV, or similar persistent storage
const memoryCache = new Map<string, CacheEntry<any>>()

/**
 * Get cached data if still valid
 * 
 * @param key - Cache key
 * @returns Cached data or null if expired/missing
 */
export async function getCached<T>(key: string): Promise<T | null> {
  try {
    // For development: use memory cache
    if (process.env.NODE_ENV === 'development') {
      const entry = memoryCache.get(key)
      if (!entry) return null
      
      const now = Date.now()
      const entryTime = new Date(entry.timestamp).getTime()
      const maxAge = entry.ttl * 1000 // Convert to milliseconds
      
      if (now - entryTime > maxAge) {
        memoryCache.delete(key)
        return null
      }
      
      return entry.data
    }

    // TODO: Implement Redis/KV cache for production
    // const entry = await kv.get(key)
    // if (!entry) return null
    // 
    // const now = Date.now()
    // const entryTime = new Date(entry.timestamp).getTime()
    // const maxAge = entry.ttl * 1000
    // 
    // if (now - entryTime > maxAge) {
    //   await kv.delete(key)
    //   return null
    // }
    // 
    // return entry.data

    return null
  } catch (error) {
    console.error('Cache get error:', error)
    return null
  }
}

/**
 * Set cache data with TTL
 * 
 * @param key - Cache key
 * @param data - Data to cache
 * @param ttlSeconds - Time to live in seconds (max 86400 for PA API compliance)
 */
export async function setCached<T>(
  key: string,
  data: T,
  ttlSeconds: number
): Promise<void> {
  try {
    // Enforce PA API 24-hour cache limit
    const maxTTL = 86400 // 24 hours in seconds
    if (ttlSeconds > maxTTL) {
      console.warn(`TTL ${ttlSeconds}s exceeds PA API limit. Clamping to ${maxTTL}s`)
      ttlSeconds = maxTTL
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: new Date().toISOString(),
      ttl: ttlSeconds
    }

    // For development: use memory cache
    if (process.env.NODE_ENV === 'development') {
      memoryCache.set(key, entry)
      return
    }

    // TODO: Implement Redis/KV cache for production
    // await kv.set(key, entry, { ex: ttlSeconds })

  } catch (error) {
    console.error('Cache set error:', error)
  }
}

/**
 * Delete cached data
 * 
 * @param key - Cache key to delete
 */
export async function deleteCached(key: string): Promise<void> {
  try {
    if (process.env.NODE_ENV === 'development') {
      memoryCache.delete(key)
      return
    }

    // TODO: Implement for production cache
    // await kv.delete(key)
    
  } catch (error) {
    console.error('Cache delete error:', error)
  }
}

/**
 * Generate standardized cache key for Amazon products
 * 
 * @param asin - Amazon Standard Identification Number
 * @param market - Market code (DE, US, UK)
 * @returns Standardized cache key
 */
export function buildProductCacheKey(asin: string, market: string): string {
  return `amazon:product:${market}:${asin}`
}

/**
 * Check if cached data is stale (approaching expiration)
 * Used to trigger background refresh while serving stale data
 * 
 * @param key - Cache key
 * @param staleThresholdSeconds - Seconds before expiration to consider stale
 * @returns True if data exists but is stale
 */
export async function isCacheStale(
  key: string,
  staleThresholdSeconds: number = 3600 // 1 hour default
): Promise<boolean> {
  try {
    const entry = process.env.NODE_ENV === 'development' 
      ? memoryCache.get(key)
      : null // TODO: implement for production cache

    if (!entry) return false

    const now = Date.now()
    const entryTime = new Date(entry.timestamp).getTime()
    const maxAge = entry.ttl * 1000
    const staleTime = maxAge - (staleThresholdSeconds * 1000)

    return now - entryTime > staleTime
  } catch {
    return false
  }
}

/**
 * Get cache statistics for monitoring
 * 
 * @returns Cache statistics object
 */
export async function getCacheStats(): Promise<{
  size: number
  hits: number
  misses: number
  hitRate: number
}> {
  if (process.env.NODE_ENV === 'development') {
    return {
      size: memoryCache.size,
      hits: 0, // TODO: implement hit/miss tracking
      misses: 0,
      hitRate: 0
    }
  }

  // TODO: Implement for production cache
  return {
    size: 0,
    hits: 0,
    misses: 0,
    hitRate: 0
  }
}

/**
 * Clear all Amazon product cache entries
 * Use with caution - for development/testing only
 */
export async function clearAmazonCache(): Promise<void> {
  try {
    if (process.env.NODE_ENV === 'development') {
      for (const key of memoryCache.keys()) {
        if (key.startsWith('amazon:')) {
          memoryCache.delete(key)
        }
      }
      return
    }

    // TODO: Implement pattern-based deletion for production
    console.warn('Cache clearing not implemented for production')
    
  } catch (error) {
    console.error('Cache clear error:', error)
  }
}

/**
 * Warm cache with pre-fetched data
 * Useful for popular products or scheduled updates
 * 
 * @param entries - Array of cache entries to warm
 */
export async function warmCache<T>(
  entries: Array<{ key: string; data: T; ttlSeconds: number }>
): Promise<void> {
  try {
    await Promise.all(
      entries.map(({ key, data, ttlSeconds }) => 
        setCached(key, data, ttlSeconds)
      )
    )
  } catch (error) {
    console.error('Cache warming error:', error)
  }
}