/**
 * Client-side Amazon Product Card
 * Fetches data via API and displays with proper affiliate compliance
 */

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { AmazonProduct, AmazonMarket } from '../../lib/types/amazon'

interface AmazonCardClientProps {
  /** Amazon Standard Identification Number */
  asin: string
  /** Target market for product data and affiliate links */
  market?: AmazonMarket
  /** Display variant */
  variant?: 'card' | 'compact' | 'inline'
  /** Optional campaign tracking */
  campaign?: string
}

export default function AmazonCardClient({
  asin,
  market = 'DE',
  variant = 'card',
  campaign // eslint-disable-line @typescript-eslint/no-unused-vars
}: AmazonCardClientProps) {
  const [product, setProduct] = useState<AmazonProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/amazon/products/${asin}?market=${market}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch product')
        }

        setProduct(data.product)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [asin, market])

  if (loading) {
    return (
      <div className="animate-pulse rounded-lg border border-gray-200 bg-gray-100 p-4">
        <div className="aspect-square bg-gray-300 rounded mb-3"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
        <p className="text-sm text-red-600 mb-1">Fehler beim Laden des Produkts</p>
        <p className="text-xs text-red-500">{error}</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
        <p className="text-sm text-gray-600">Produkt nicht gefunden</p>
        <p className="text-xs text-gray-500">ASIN: {asin}</p>
      </div>
    )
  }

  // Check if data is stale (>24 hours)
  const staleThreshold = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
  const isStale = product.offerAgeMs > staleThreshold

  // Render variants
  if (variant === 'inline') {
    return (
      <a
        href={product.affiliateUrl}
        rel="sponsored nofollow noopener"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline"
        target="_blank"
      >
        <span>{product.title}</span>
        {product.offer && (
          <span className="font-medium">{product.offer.display}</span>
        )}
        <svg 
          className="w-3 h-3" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
          />
        </svg>
      </a>
    )
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3 p-3 border rounded-lg hover:shadow-md transition-shadow">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={60}
            height={60}
            className="rounded object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm line-clamp-2 mb-1">
            {product.title}
          </h4>
          {product.brand && (
            <p className="text-xs text-gray-600 mb-1">{product.brand}</p>
          )}
          {product.offer && (
            <p className="text-lg font-bold text-green-600">
              {product.offer.display}
            </p>
          )}
          {isStale && (
            <p className="text-xs text-amber-600 mt-1">
              ⚠️ Preis möglicherweise veraltet
            </p>
          )}
        </div>
        <div className="flex-shrink-0">
          <a
            href={product.affiliateUrl}
            rel="sponsored nofollow noopener"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            target="_blank"
          >
            Ansehen
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    )
  }

  // Default card variant
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-200">
      {product.imageUrl && (
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 384px) 100vw, 384px"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-medium text-gray-900 line-clamp-3 text-sm leading-5 mb-2">
            {product.title}
          </h3>
          
          {product.brand && (
            <p className="text-sm text-gray-600 mb-2">
              von {product.brand}
            </p>
          )}
        </div>
        
        {product.offer && (
          <div className="mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {product.offer.display}
              </span>
            </div>
            
            {product.availability && (
              <p className="text-sm text-green-600 mt-1">
                {product.availability}
              </p>
            )}
            
            {isStale && (
              <div className="flex items-center gap-1 mt-2 p-2 bg-amber-50 rounded text-xs text-amber-700">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Preis möglicherweise veraltet</span>
              </div>
            )}
          </div>
        )}
        
        <a
          href={product.affiliateUrl}
          rel="sponsored nofollow noopener"
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          target="_blank"
        >
          Bei Amazon ansehen
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Werbelink • Als Amazon-Partner verdienen wir an qualifizierten Verkäufen
          </p>
        </div>
      </div>
    </div>
  )
}