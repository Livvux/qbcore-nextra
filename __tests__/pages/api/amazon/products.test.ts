/**
 * Tests for Amazon Products API Route
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createMocks } from 'node-mocks-http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { AmazonProduct } from '../../../../lib/types/amazon'

// Mock the dependencies
vi.mock('../../../../lib/amazon/api-client')
vi.mock('../../../../lib/amazon/rate-limiter')
vi.mock('../../../../lib/amazon/logger')

import { getProduct } from '../../../../lib/amazon/api-client'
import { rateLimitedRequest } from '../../../../lib/amazon/rate-limiter'
import { logError } from '../../../../lib/amazon/logger'
import handler from '../../../../pages/api/amazon/products/[asin]'

const mockProduct: AmazonProduct = {
  asin: 'B08N5WRWNW',
  title: 'Test Product',
  brand: 'TestBrand',
  imageUrl: 'https://example.com/image.jpg',
  offer: {
    amount: 2999,
    currency: 'EUR',
    display: '€29.99'
  },
  availability: 'In Stock',
  affiliateUrl: 'https://amazon.de/dp/B08N5WRWNW?tag=test-21',
  lastFetched: new Date().toISOString(),
  offerAgeMs: 1000,
  market: 'DE'
}

describe('/api/amazon/products/[asin]', () => {
  const mockGetProduct = getProduct as any
  const mockRateLimitedRequest = rateLimitedRequest as any
  const mockLogError = logError as any

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Default successful behavior
    mockRateLimitedRequest.mockImplementation((key: string, fn: Function) => fn())
    mockGetProduct.mockResolvedValue(mockProduct)
  })

  describe('GET requests', () => {
    it('should return product data for valid ASIN', async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'GET',
        query: { asin: 'B08N5WRWNW' }
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(200)
      const data = JSON.parse(res._getData())
      expect(data.product).toEqual(mockProduct)
      expect(data.cached).toBe(true) // offerAgeMs > 0
    })

    it('should detect market from Accept-Language header', async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'GET',
        query: { asin: 'B08N5WRWNW' },
        headers: { 'accept-language': 'en-US,en;q=0.9' }
      })

      await handler(req, res)

      expect(mockRateLimitedRequest).toHaveBeenCalledWith(
        'B08N5WRWNW:US',
        expect.any(Function),
        'US'
      )
    })

    it('should use market from query parameter', async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'GET',
        query: { asin: 'B08N5WRWNW', market: 'UK' }
      })

      await handler(req, res)

      expect(mockRateLimitedRequest).toHaveBeenCalledWith(
        'B08N5WRWNW:UK',
        expect.any(Function),
        'UK'
      )
    })

    it('should return 404 for non-existent product', async () => {
      mockGetProduct.mockResolvedValue(null)

      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'GET',
        query: { asin: 'B08N5WRWNW' }
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(404)
      const data = JSON.parse(res._getData())
      expect(data.error).toContain('Product not found')
    })

    it('should return 400 for invalid ASIN', async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'GET',
        query: { asin: 'invalid' }
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(400)
      const data = JSON.parse(res._getData())
      expect(data.error).toContain('Invalid ASIN')
    })

    it('should handle missing ASIN parameter', async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'GET',
        query: {}
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(400)
      const data = JSON.parse(res._getData())
      expect(data.error).toContain('Invalid ASIN')
    })

    it('should set appropriate cache headers for fresh data', async () => {
      const freshProduct = { ...mockProduct, offerAgeMs: 0 }
      mockGetProduct.mockResolvedValue(freshProduct)

      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'GET',
        query: { asin: 'B08N5WRWNW' }
      })

      await handler(req, res)

      expect(res._getHeaders()['cache-control']).toContain('s-maxage=3600')
    })

    it('should set appropriate cache headers for stale data', async () => {
      const staleProduct = { 
        ...mockProduct, 
        offerAgeMs: 25 * 60 * 60 * 1000 // 25 hours
      }
      mockGetProduct.mockResolvedValue(staleProduct)

      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'GET',
        query: { asin: 'B08N5WRWNW' }
      })

      await handler(req, res)

      expect(res._getHeaders()['cache-control']).toContain('s-maxage=300')
    })

    it('should include CORS headers', async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'GET',
        query: { asin: 'B08N5WRWNW' }
      })

      await handler(req, res)

      expect(res._getHeaders()['access-control-allow-origin']).toBe('*')
      expect(res._getHeaders()['access-control-allow-methods']).toBe('GET')
    })
  })

  describe('error handling', () => {
    it('should handle API errors gracefully', async () => {
      mockGetProduct.mockRejectedValue(new Error('API Error'))

      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'GET',
        query: { asin: 'B08N5WRWNW' }
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(500)
      expect(mockLogError).toHaveBeenCalled()
    })

    it('should handle rate limiting errors with user-friendly message', async () => {
      mockGetProduct.mockRejectedValue(new Error('Rate limited'))

      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'GET',
        query: { asin: 'B08N5WRWNW' }
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(500)
      const data = JSON.parse(res._getData())
      expect(data.error).toContain('Service temporarily unavailable')
    })

    it('should not expose internal error details', async () => {
      mockGetProduct.mockRejectedValue(new Error('Internal API credentials invalid'))

      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'GET',
        query: { asin: 'B08N5WRWNW' }
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(500)
      const data = JSON.parse(res._getData())
      expect(data.error).not.toContain('credentials')
      expect(data.error).toBe('Failed to fetch product information')
    })
  })

  describe('HTTP methods', () => {
    it('should reject non-GET requests', async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'POST',
        query: { asin: 'B08N5WRWNW' }
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(405)
      expect(res._getHeaders()['allow']).toEqual(['GET'])
    })

    it('should reject PUT requests', async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'PUT',
        query: { asin: 'B08N5WRWNW' }
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(405)
    })

    it('should reject DELETE requests', async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'DELETE',
        query: { asin: 'B08N5WRWNW' }
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(405)
    })
  })

  describe('market detection', () => {
    it('should default to DE market', async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'GET',
        query: { asin: 'B08N5WRWNW' }
      })

      await handler(req, res)

      expect(mockRateLimitedRequest).toHaveBeenCalledWith(
        'B08N5WRWNW:DE',
        expect.any(Function),
        'DE'
      )
    })

    it('should detect German market from accept-language', async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'GET',
        query: { asin: 'B08N5WRWNW' },
        headers: { 'accept-language': 'de-DE,de;q=0.9' }
      })

      await handler(req, res)

      expect(mockRateLimitedRequest).toHaveBeenCalledWith(
        'B08N5WRWNW:DE',
        expect.any(Function),
        'DE'
      )
    })

    it('should detect UK market from accept-language', async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: 'GET',
        query: { asin: 'B08N5WRWNW' },
        headers: { 'accept-language': 'en-GB,en;q=0.9' }
      })

      await handler(req, res)

      expect(mockRateLimitedRequest).toHaveBeenCalledWith(
        'B08N5WRWNW:UK',
        expect.any(Function),
        'UK'
      )
    })
  })
})