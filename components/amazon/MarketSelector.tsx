/**
 * Amazon Market Selector Component
 * Allows users to manually select their preferred Amazon market
 */

'use client'

import { useState, useEffect } from 'react'
import type { AmazonMarket } from '../../lib/types/amazon'
import { 
  detectUserMarket, 
  setUserMarketPreference, 
  getMarketDisplayName,
  getMarketCurrency 
} from '../../lib/amazon/market-detection'

interface MarketSelectorProps {
  /** Current selected market */
  value?: AmazonMarket
  /** Callback when market changes */
  onChange?: (market: AmazonMarket) => void
  /** Display style */
  variant?: 'dropdown' | 'buttons' | 'minimal'
  /** Show currency symbols */
  showCurrency?: boolean
  /** Additional CSS classes */
  className?: string
}

const AVAILABLE_MARKETS: AmazonMarket[] = ['DE', 'US', 'UK']

export default function MarketSelector({
  value,
  onChange,
  variant = 'dropdown',
  showCurrency = true,
  className = ''
}: MarketSelectorProps) {
  const [selectedMarket, setSelectedMarket] = useState<AmazonMarket>(value || detectUserMarket())

  useEffect(() => {
    if (value && value !== selectedMarket) {
      setSelectedMarket(value)
    }
  }, [value, selectedMarket])

  const handleMarketChange = (market: AmazonMarket) => {
    setSelectedMarket(market)
    setUserMarketPreference(market)
    onChange?.(market)
  }

  if (variant === 'buttons') {
    return (
      <div className={`flex gap-2 ${className}`}>
        {AVAILABLE_MARKETS.map((market) => (
          <button
            key={market}
            onClick={() => handleMarketChange(market)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedMarket === market
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {market}
            {showCurrency && (
              <span className="ml-1 opacity-75">
                {getMarketCurrency(market)}
              </span>
            )}
          </button>
        ))}
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <select
        value={selectedMarket}
        onChange={(e) => handleMarketChange(e.target.value as AmazonMarket)}
        className={`text-xs bg-transparent border-none focus:outline-none ${className}`}
      >
        {AVAILABLE_MARKETS.map((market) => (
          <option key={market} value={market}>
            {market} {showCurrency && getMarketCurrency(market)}
          </option>
        ))}
      </select>
    )
  }

  // Default dropdown variant
  return (
    <div className={`relative ${className}`}>
      <select
        value={selectedMarket}
        onChange={(e) => handleMarketChange(e.target.value as AmazonMarket)}
        className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {AVAILABLE_MARKETS.map((market) => (
          <option key={market} value={market}>
            {getMarketDisplayName(market)}
            {showCurrency && ` (${getMarketCurrency(market)})`}
          </option>
        ))}
      </select>
    </div>
  )
}