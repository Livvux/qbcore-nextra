/**
 * Smart Amazon Card with Automatic Market Detection
 * Automatically detects user's market but allows manual override
 */

'use client'

import { useState, useEffect } from 'react'
import AmazonCardClient from './AmazonCardClient'
import MarketSelector from './MarketSelector'
import type { AmazonMarket } from '../../lib/types/amazon'
import { detectUserMarket } from '../../lib/amazon/market-detection'

interface SmartAmazonCardProps {
  /** Amazon Standard Identification Number */
  asin: string
  /** Override auto-detected market */
  market?: AmazonMarket
  /** Display variant */
  variant?: 'card' | 'compact' | 'inline'
  /** Show market selector */
  showMarketSelector?: boolean
  /** Market selector variant */
  selectorVariant?: 'dropdown' | 'buttons' | 'minimal'
  /** Optional campaign tracking */
  campaign?: string
}

export default function SmartAmazonCard({
  asin,
  market: forcedMarket,
  variant = 'card',
  showMarketSelector = false,
  selectorVariant = 'minimal',
  campaign
}: SmartAmazonCardProps) {
  const [detectedMarket, setDetectedMarket] = useState<AmazonMarket>()
  const [userSelectedMarket, setUserSelectedMarket] = useState<AmazonMarket>()

  useEffect(() => {
    // Auto-detect market on component mount
    const detected = detectUserMarket()
    setDetectedMarket(detected)

    // Listen for market changes
    const handleMarketChange = (event: CustomEvent<AmazonMarket>) => {
      setUserSelectedMarket(event.detail)
    }

    window.addEventListener('amazon-market-changed', handleMarketChange as EventListener)
    return () => {
      window.removeEventListener('amazon-market-changed', handleMarketChange as EventListener)
    }
  }, [])

  // Priority: forced market > user selected > auto-detected > fallback
  const effectiveMarket = forcedMarket || userSelectedMarket || detectedMarket || 'DE'

  if (variant === 'inline') {
    return (
      <span className="inline-flex items-center gap-1">
        <AmazonCardClient
          asin={asin}
          market={effectiveMarket}
          variant="inline"
          campaign={campaign}
        />
        {showMarketSelector && !forcedMarket && (
          <MarketSelector
            value={effectiveMarket}
            variant={selectorVariant}
            onChange={setUserSelectedMarket}
            className="ml-1"
          />
        )}
      </span>
    )
  }

  return (
    <div className="relative">
      {showMarketSelector && !forcedMarket && (
        <div className="absolute top-2 right-2 z-10">
          <MarketSelector
            value={effectiveMarket}
            variant={selectorVariant}
            onChange={setUserSelectedMarket}
            className="text-xs"
          />
        </div>
      )}
      
      <AmazonCardClient
        asin={asin}
        market={effectiveMarket}
        variant={variant}
        campaign={campaign}
      />
    </div>
  )
}