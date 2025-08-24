/**
 * Tests for Amazon Card Component
 * Note: These are basic structure tests. Full rendering tests would require mocking the PA API
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { AmazonProduct } from '../../../lib/types/amazon'

// Mock the API client to avoid actual API calls in tests
vi.mock('../../../lib/amazon/api-client', () => ({
  getProduct: vi.fn()
}))

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  )
}))

import { getProduct } from '../../../lib/amazon/api-client'
import AmazonCard from '../../../components/amazon/AmazonCard'

const mockProduct: AmazonProduct = {
  asin: 'B08N5WRWNW',
  title: 'Test Gaming Mouse',
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
  offerAgeMs: 0,
  market: 'DE'
}

describe('AmazonCard Component', () => {
  const mockGetProduct = getProduct as any

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('successful product loading', () => {
    beforeEach(() => {
      mockGetProduct.mockResolvedValue(mockProduct)
    })

    it('should render product information', async () => {
      const component = await AmazonCard({ 
        asin: 'B08N5WRWNW', 
        market: 'DE' 
      })
      
      render(component as React.ReactElement)
      
      expect(screen.getByText('Test Gaming Mouse')).toBeDefined()
      expect(screen.getByText('von TestBrand')).toBeDefined()
      expect(screen.getByText('€29.99')).toBeDefined()
      expect(screen.getByText('In Stock')).toBeDefined()
    })

    it('should include proper affiliate link attributes', async () => {
      const component = await AmazonCard({ 
        asin: 'B08N5WRWNW', 
        market: 'DE' 
      })
      
      render(component as React.ReactElement)
      
      const affiliateLink = screen.getByRole('link')
      expect(affiliateLink.getAttribute('href')).toBe(mockProduct.affiliateUrl)
      expect(affiliateLink.getAttribute('rel')).toBe('sponsored nofollow noopener')
      expect(affiliateLink.getAttribute('target')).toBe('_blank')
    })

    it('should display affiliate disclosure', async () => {
      const component = await AmazonCard({ 
        asin: 'B08N5WRWNW', 
        market: 'DE' 
      })
      
      render(component as React.ReactElement)
      
      expect(screen.getByText(/Werbelink/)).toBeDefined()
      expect(screen.getByText(/Amazon-Partner/)).toBeDefined()
    })
  })

  describe('stale data handling', () => {
    it('should show staleness warning for old data', async () => {
      const staleProduct = {
        ...mockProduct,
        offerAgeMs: 25 * 60 * 60 * 1000 // 25 hours
      }
      mockGetProduct.mockResolvedValue(staleProduct)

      const component = await AmazonCard({ 
        asin: 'B08N5WRWNW', 
        market: 'DE' 
      })
      
      render(component as React.ReactElement)
      
      expect(screen.getByText(/möglicherweise veraltet/)).toBeDefined()
    })
  })

  describe('compact variant', () => {
    beforeEach(() => {
      mockGetProduct.mockResolvedValue(mockProduct)
    })

    it('should render compact layout', async () => {
      const component = await AmazonCard({ 
        asin: 'B08N5WRWNW', 
        market: 'DE',
        variant: 'compact'
      })
      
      render(component as React.ReactElement)
      
      expect(screen.getByText('Test Gaming Mouse')).toBeDefined()
      expect(screen.getByText('Ansehen')).toBeDefined()
    })
  })

  describe('inline variant', () => {
    beforeEach(() => {
      mockGetProduct.mockResolvedValue(mockProduct)
    })

    it('should render inline layout', async () => {
      const component = await AmazonCard({ 
        asin: 'B08N5WRWNW', 
        market: 'DE',
        variant: 'inline'
      })
      
      render(component as React.ReactElement)
      
      const link = screen.getByRole('link')
      expect(link.textContent).toContain('Test Gaming Mouse')
      expect(link.textContent).toContain('€29.99')
    })
  })

  describe('error handling', () => {
    it('should display error message when product not found', async () => {
      mockGetProduct.mockResolvedValue(null)

      const component = await AmazonCard({ 
        asin: 'INVALID123', 
        market: 'DE' 
      })
      
      render(component as React.ReactElement)
      
      expect(screen.getByText(/Product not found/)).toBeDefined()
      expect(screen.getByText(/INVALID123/)).toBeDefined()
    })

    it('should display error message when API fails', async () => {
      mockGetProduct.mockRejectedValue(new Error('API Error'))

      const component = await AmazonCard({ 
        asin: 'B08N5WRWNW', 
        market: 'DE' 
      })
      
      render(component as React.ReactElement)
      
      expect(screen.getByText(/Fehler beim Laden/)).toBeDefined()
    })
  })

  describe('optional fields handling', () => {
    it('should handle missing optional fields gracefully', async () => {
      const minimalProduct = {
        asin: 'B08N5WRWNW',
        title: 'Minimal Product',
        affiliateUrl: 'https://amazon.de/dp/B08N5WRWNW?tag=test-21',
        lastFetched: new Date().toISOString(),
        offerAgeMs: 0,
        market: 'DE' as const
      }
      mockGetProduct.mockResolvedValue(minimalProduct)

      const component = await AmazonCard({ 
        asin: 'B08N5WRWNW', 
        market: 'DE' 
      })
      
      render(component as React.ReactElement)
      
      expect(screen.getByText('Minimal Product')).toBeDefined()
      // Should not crash when optional fields are missing
      expect(screen.queryByText(/von/)).toBeNull() // No brand
    })
  })

  describe('API call behavior', () => {
    it('should call getProduct with correct parameters', async () => {
      mockGetProduct.mockResolvedValue(mockProduct)

      await AmazonCard({ 
        asin: 'B08N5WRWNW', 
        market: 'US' 
      })

      expect(mockGetProduct).toHaveBeenCalledWith('B08N5WRWNW', 'US')
    })

    it('should default to DE market when not specified', async () => {
      mockGetProduct.mockResolvedValue(mockProduct)

      await AmazonCard({ 
        asin: 'B08N5WRWNW'
      })

      expect(mockGetProduct).toHaveBeenCalledWith('B08N5WRWNW', 'DE')
    })
  })
})