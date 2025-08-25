'use client'

/**
 * Client-Only Amazon Grid Component
 * Displays multiple Amazon products in a grid layout
 */

import { useState, useEffect } from 'react'
import ClientOnlyAmazonCard from './ClientOnlyAmazonCard'
import type { AmazonMarket } from '../../lib/types/amazon'

interface ClientOnlyAmazonGridProps {
  /** Array of Amazon ASINs to display */
  asins: string[]
  /** Target market for product data and affiliate links */
  market?: AmazonMarket
  /** Number of columns in the grid */
  columns?: number
  /** Grid title */
  title?: string
  /** Card variant */
  variant?: 'card' | 'compact'
}

export default function ClientOnlyAmazonGrid({
  asins,
  market = 'DE',
  columns = 2,
  title,
  variant = 'card'
}: ClientOnlyAmazonGridProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render on server side
  if (!mounted) {
    return (
      <div className="my-6">
        {title && (
          <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>
        )}
        <div className={`grid gap-4 grid-cols-1 md:grid-cols-${columns}`}>
          {asins.map((asin) => (
            <div key={asin} className="animate-pulse">
              <div className="rounded-lg border border-gray-200 bg-gray-100 p-4">
                <div className="aspect-square bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const gridColsClass = columns === 1 ? 'grid-cols-1' : 
                      columns === 2 ? 'md:grid-cols-2' :
                      columns === 3 ? 'md:grid-cols-3' :
                      columns === 4 ? 'md:grid-cols-4' :
                      'md:grid-cols-2'

  return (
    <div className="my-6">
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>
      )}
      <div className={`grid gap-4 grid-cols-1 ${gridColsClass}`}>
        {asins.map((asin) => (
          <ClientOnlyAmazonCard
            key={asin}
            asin={asin}
            market={market}
            variant={variant}
          />
        ))}
      </div>
    </div>
  )
}