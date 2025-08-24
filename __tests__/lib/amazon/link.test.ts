/**
 * Tests for Amazon Link Builder
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  buildAffiliateUrl,
  buildProductUrl,
  extractASIN,
  isValidASIN,
  detectMarket,
  generateSubTag
} from '../../../lib/amazon/link'

describe('Amazon Link Builder', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      AMAZON_TAG_DE: 'testpartner-21',
      AMAZON_TAG_US: 'testpartner-20',
      AMAZON_TAG_UK: 'testpartner-21'
    }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('buildAffiliateUrl', () => {
    it('should build correct affiliate URL for DE market', () => {
      const result = buildAffiliateUrl('B08N5WRWNW', 'DE')
      expect(result).toBe('https://www.amazon.de/dp/B08N5WRWNW?tag=testpartner-21')
    })

    it('should build correct affiliate URL for US market', () => {
      const result = buildAffiliateUrl('B08N5WRWNW', 'US')
      expect(result).toBe('https://www.amazon.com/dp/B08N5WRWNW?tag=testpartner-20')
    })

    it('should build correct affiliate URL for UK market', () => {
      const result = buildAffiliateUrl('B08N5WRWNW', 'UK')
      expect(result).toBe('https://www.amazon.co.uk/dp/B08N5WRWNW?tag=testpartner-21')
    })

    it('should include ascsubtag when provided', () => {
      const result = buildAffiliateUrl('B08N5WRWNW', 'DE', 'blog_tutorial')
      expect(result).toBe('https://www.amazon.de/dp/B08N5WRWNW?tag=testpartner-21&ascsubtag=blog_tutorial')
    })

    it('should throw error for invalid ASIN', () => {
      expect(() => buildAffiliateUrl('invalid', 'DE')).toThrow('Invalid ASIN format')
    })

    it('should throw error when partner tag is missing', () => {
      delete process.env.AMAZON_TAG_DE
      expect(() => buildAffiliateUrl('B08N5WRWNW', 'DE')).toThrow('Missing partner tag')
    })
  })

  describe('buildProductUrl', () => {
    it('should build clean product URL without affiliate parameters', () => {
      const result = buildProductUrl('B08N5WRWNW', 'DE')
      expect(result).toBe('https://www.amazon.de/dp/B08N5WRWNW')
    })

    it('should throw error for invalid ASIN', () => {
      expect(() => buildProductUrl('invalid', 'DE')).toThrow('Invalid ASIN format')
    })
  })

  describe('extractASIN', () => {
    it('should extract ASIN from standard product URL', () => {
      const result = extractASIN('https://www.amazon.de/dp/B08N5WRWNW/')
      expect(result).toBe('B08N5WRWNW')
    })

    it('should extract ASIN from gp/product URL', () => {
      const result = extractASIN('https://www.amazon.com/gp/product/B08N5WRWNW')
      expect(result).toBe('B08N5WRWNW')
    })

    it('should extract ASIN from URL with query parameters', () => {
      const result = extractASIN('https://www.amazon.de/dp/B08N5WRWNW?tag=test&ref=sr_1_1')
      expect(result).toBe('B08N5WRWNW')
    })

    it('should return null for invalid URLs', () => {
      const result = extractASIN('https://www.example.com/invalid')
      expect(result).toBeNull()
    })

    it('should return null for malformed URLs', () => {
      const result = extractASIN('not-a-url')
      expect(result).toBeNull()
    })
  })

  describe('isValidASIN', () => {
    it('should validate correct ASIN format', () => {
      expect(isValidASIN('B08N5WRWNW')).toBe(true)
      expect(isValidASIN('1234567890')).toBe(true)
      expect(isValidASIN('B07QK4W6P7')).toBe(true)
    })

    it('should reject invalid ASIN formats', () => {
      expect(isValidASIN('invalid')).toBe(false)
      expect(isValidASIN('B08N5WRWN')).toBe(false) // Too short
      expect(isValidASIN('B08N5WRWNWW')).toBe(false) // Too long
      expect(isValidASIN('B08N5WRWN@')).toBe(false) // Invalid character
      expect(isValidASIN('')).toBe(false)
      expect(isValidASIN(null as any)).toBe(false)
    })
  })

  describe('detectMarket', () => {
    it('should detect market from domain', () => {
      expect(detectMarket('https://amazon.de/dp/B123')).toBe('DE')
      expect(detectMarket('https://amazon.com/dp/B123')).toBe('US')
      expect(detectMarket('https://amazon.co.uk/dp/B123')).toBe('UK')
    })

    it('should detect market from locale', () => {
      expect(detectMarket('de-DE')).toBe('DE')
      expect(detectMarket('en-US')).toBe('US')
      expect(detectMarket('en-GB')).toBe('UK')
    })

    it('should return null for unknown markets', () => {
      expect(detectMarket('https://example.com')).toBeNull()
      expect(detectMarket('fr-FR')).toBeNull()
    })
  })

  describe('generateSubTag', () => {
    it('should generate valid sub tag', () => {
      const result = generateSubTag('blog', 'tutorial', 'getting-started')
      expect(result).toBe('blog_tutorial_getting-started')
    })

    it('should generate sub tag without content', () => {
      const result = generateSubTag('blog', 'tutorial')
      expect(result).toBe('blog_tutorial')
    })

    it('should sanitize invalid characters', () => {
      const result = generateSubTag('blog!@#', 'tutorial$%^', 'test&*()')
      expect(result).toBe('blog_tutorial_test')
    })

    it('should limit sub tag length', () => {
      const longSource = 'a'.repeat(30)
      const longCampaign = 'b'.repeat(30)
      const result = generateSubTag(longSource, longCampaign)
      expect(result.length).toBeLessThanOrEqual(50)
    })
  })
})