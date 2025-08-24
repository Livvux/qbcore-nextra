/**
 * Tests for Amazon Rate Limiter
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  rateLimitedRequest,
  getRateLimiterStats,
  clearQueue,
  resetRateLimiter
} from '../../../lib/amazon/rate-limiter'

// Mock console.log to avoid test output noise
vi.spyOn(console, 'log').mockImplementation(() => {})

describe('Amazon Rate Limiter', () => {
  beforeEach(() => {
    resetRateLimiter()
    vi.clearAllTimers()
  })

  describe('rateLimitedRequest', () => {
    it('should execute request immediately when tokens available', async () => {
      const mockFn = vi.fn().mockResolvedValue('success')
      const result = await rateLimitedRequest('test-key', mockFn, 'DE')
      
      expect(result).toBe('success')
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should deduplicate identical requests', async () => {
      const mockFn1 = vi.fn().mockResolvedValue('success1')
      const mockFn2 = vi.fn().mockResolvedValue('success2')
      
      // Start two requests with the same key simultaneously
      const promise1 = rateLimitedRequest('duplicate-key', mockFn1, 'DE')
      const promise2 = rateLimitedRequest('duplicate-key', mockFn2, 'DE')
      
      const [result1, result2] = await Promise.all([promise1, promise2])
      
      // Both should return the same result (from first function)
      expect(result1).toBe('success1')
      expect(result2).toBe('success1')
      
      // Only first function should be called
      expect(mockFn1).toHaveBeenCalledTimes(1)
      expect(mockFn2).toHaveBeenCalledTimes(0)
    })

    it('should handle request errors', async () => {
      const mockFn = vi.fn().mockRejectedValue(new Error('API Error'))
      
      await expect(rateLimitedRequest('error-key', mockFn, 'DE'))
        .rejects.toThrow('API Error')
    })

    it('should retry on rate limit errors', async () => {
      const mockFn = vi.fn()
        .mockRejectedValueOnce(new Error('Rate limited'))
        .mockResolvedValueOnce('success after retry')
      
      const result = await rateLimitedRequest('retry-key', mockFn, 'DE')
      
      expect(result).toBe('success after retry')
      expect(mockFn).toHaveBeenCalledTimes(2)
    })

    it('should handle quota exceeded errors', async () => {
      const mockFn = vi.fn().mockRejectedValue(new Error('RequestQuotaExceeded'))
      
      await expect(rateLimitedRequest('quota-key', mockFn, 'DE'))
        .rejects.toThrow('Request quota exceeded')
    })

    it('should respect max retries', async () => {
      const mockFn = vi.fn().mockRejectedValue(new Error('Rate limited'))
      
      await expect(rateLimitedRequest('max-retry-key', mockFn, 'DE'))
        .rejects.toThrow('Max retries')
    })
  })

  describe('getRateLimiterStats', () => {
    it('should return current rate limiter statistics', () => {
      const stats = getRateLimiterStats()
      
      expect(stats).toHaveProperty('tokens')
      expect(stats).toHaveProperty('capacity')
      expect(stats).toHaveProperty('queueLength')
      expect(stats).toHaveProperty('inflightCount')
      
      expect(typeof stats.tokens).toBe('number')
      expect(typeof stats.capacity).toBe('number')
      expect(typeof stats.queueLength).toBe('number')
      expect(typeof stats.inflightCount).toBe('number')
    })
  })

  describe('clearQueue', () => {
    it('should clear the request queue', () => {
      // This is mainly a smoke test as the queue is internal
      expect(() => clearQueue()).not.toThrow()
      
      const stats = getRateLimiterStats()
      expect(stats.queueLength).toBe(0)
      expect(stats.inflightCount).toBe(0)
    })
  })

  describe('token bucket behavior', () => {
    it('should consume tokens for requests', async () => {
      const initialStats = getRateLimiterStats()
      const initialTokens = initialStats.tokens
      
      const mockFn = vi.fn().mockResolvedValue('success')
      await rateLimitedRequest('token-test', mockFn, 'DE')
      
      const finalStats = getRateLimiterStats()
      expect(finalStats.tokens).toBeLessThanOrEqual(initialTokens)
    })
  })

  describe('error handling', () => {
    it('should handle async function errors gracefully', async () => {
      const mockFn = vi.fn(async () => {
        throw new Error('Async function error')
      })
      
      await expect(rateLimitedRequest('async-error', mockFn, 'DE'))
        .rejects.toThrow('Async function error')
    })

    it('should handle sync function errors gracefully', async () => {
      const mockFn = vi.fn(() => {
        throw new Error('Sync function error')
      })
      
      await expect(rateLimitedRequest('sync-error', mockFn, 'DE'))
        .rejects.toThrow('Sync function error')
    })
  })
})