/**
 * Client-side Amazon Product Grid
 * Displays multiple Amazon products in a responsive grid
 */

'use client'

import SmartAmazonCard from './SmartAmazonCard'
import type { AmazonMarket } from '../../lib/types/amazon'

interface AmazonGridClientProps {
  /** Array of ASINs to display */
  asins: string[]
  /** Override auto-detected market (optional) */
  market?: AmazonMarket
  /** Grid columns (responsive) */
  columns?: 1 | 2 | 3 | 4
  /** Display variant for cards */
  variant?: 'card' | 'compact'
  /** Title for the grid section */
  title?: string
  /** Description text */
  description?: string
  /** Campaign tracking for all products */
  campaign?: string
  /** Show market selector on each card */
  showMarketSelector?: boolean
}

/**
 * Amazon Product Grid Client Component
 * Renders multiple Amazon products in a responsive grid layout
 */
export default function AmazonGridClient({
  asins,
  market,
  columns = 3,
  variant = 'card',
  title,
  description,
  campaign,
  showMarketSelector = false
}: AmazonGridClientProps) {
  if (!asins || asins.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Keine Produkte verfügbar</p>
      </div>
    )
  }

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <div className="w-full">
      {/* Header */}
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Product Grid */}
      <div className={`grid gap-6 ${gridClasses[columns]}`}>
        {asins.map((asin) => (
          <div key={asin} className="flex">
            <SmartAmazonCard
              asin={asin}
              market={market}
              variant={variant}
              campaign={campaign}
              showMarketSelector={showMarketSelector}
            />
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Die gezeigten Preise können veraltet sein. Aktuelle Preise und Verfügbarkeit finden Sie auf Amazon.{' '}
          Als Amazon-Partner verdienen wir an qualifizierten Verkäufen.
        </p>
      </div>
    </div>
  )
}