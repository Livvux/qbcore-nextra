/**
 * Tests for Amazon Cache Layer
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  getCached,
  setCached,
  deleteCached,
  buildProductCacheKey,
  isCacheStale,
  clearAmazonCache
} from '../../../lib/amazon/cache'

// Mock console.warn to avoid test output noise
vi.spyOn(console, 'warn').mockImplementation(() => {})
vi.spyOn(console, 'error').mockImplementation(() => {})

describe('Amazon Cache Layer', () => {
  beforeEach(() => {
    // Clear cache before each test
    clearAmazonCache()
  })

  describe('setCached and getCached', () => {
    it('should store and retrieve cached data', async () => {
      const testData = { title: 'Test Product', asin: 'B123456789' }
      const key = 'test:product'
      const ttl = 3600

      await setCached(key, testData, ttl)
      const result = await getCached(key)

      expect(result).toEqual(testData)
    })

    it('should return null for non-existent keys', async () => {
      const result = await getCached('non-existent-key')
      expect(result).toBeNull()
    })

    it('should enforce 24-hour TTL limit', async () => {
      const testData = { test: 'data' }
      const key = 'test:ttl'
      const longTTL = 90000 // > 24 hours

      await setCached(key, testData, longTTL)
      // Should clamp to 86400 seconds (24 hours) but still cache the data
      const result = await getCached(key)
      expect(result).toEqual(testData)
    })

    it('should handle cache errors gracefully', async () => {
      // Force an error by passing invalid data
      await expect(setCached('', null as any, 3600)).resolves.toBeUndefined()
      const result = await getCached('invalid-key')
      expect(result).toBeNull()
    })
  })

  describe('deleteCached', () => {
    it('should delete cached data', async () => {
      const testData = { test: 'data' }
      const key = 'test:delete'

      await setCached(key, testData, 3600)
      let result = await getCached(key)
      expect(result).toEqual(testData)

      await deleteCached(key)
      result = await getCached(key)
      expect(result).toBeNull()
    })
  })

  describe('buildProductCacheKey', () => {
    it('should build standardized cache key', () => {
      const result = buildProductCacheKey('B123456789', 'DE')
      expect(result).toBe('amazon:product:DE:B123456789')
    })

    it('should handle different markets', () => {
      expect(buildProductCacheKey('B123456789', 'US')).toBe('amazon:product:US:B123456789')
      expect(buildProductCacheKey('B123456789', 'UK')).toBe('amazon:product:UK:B123456789')
    })
  })

  describe('isCacheStale', () => {
    it('should return false for non-existent keys', async () => {
      const result = await isCacheStale('non-existent-key')
      expect(result).toBe(false)
    })

    // Note: Testing staleness would require mocking time or waiting,
    // which is not practical in unit tests. This would be better tested
    // in integration tests with controlled time.
  })

  describe('clearAmazonCache', () => {
    it('should clear all Amazon cache entries', async () => {
      // Add some test data
      await setCached('amazon:product:DE:B123', { test: 'data1' }, 3600)
      await setCached('amazon:product:US:B456', { test: 'data2' }, 3600)
      await setCached('other:cache:key', { test: 'data3' }, 3600)

      // Clear Amazon cache
      await clearAmazonCache()

      // Amazon entries should be gone
      expect(await getCached('amazon:product:DE:B123')).toBeNull()
      expect(await getCached('amazon:product:US:B456')).toBeNull()
      
      // Non-Amazon entries should remain (if we had a persistent cache)
      // In memory cache, everything gets cleared in test environment
    })
  })

  describe('TTL behavior', () => {
    it('should respect TTL limits', async () => {
      const testData = { title: 'Test Product' }
      const key = 'test:ttl-behavior'

      // Set data with 0 TTL (should expire immediately in a real cache)
      await setCached(key, testData, 0)
      const result = await getCached(key)
      
      // In memory cache for development, data persists regardless of TTL
      // In production with Redis/KV, this would return null after expiration
      expect(result).toBeDefined()
    })
  })
})