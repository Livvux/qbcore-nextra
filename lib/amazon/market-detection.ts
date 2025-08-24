/**
 * Intelligent Amazon Market Detection
 * Automatically determines the best market based on user location and preferences
 */

import type { AmazonMarket } from '../types/amazon'

/**
 * Detect user's preferred Amazon market based on various signals
 */
export function detectUserMarket(): AmazonMarket {
  // 1. Check for explicit user preference (localStorage)
  if (typeof window !== 'undefined') {
    const savedMarket = localStorage.getItem('amazon-preferred-market') as AmazonMarket
    if (savedMarket && ['DE', 'US', 'UK'].includes(savedMarket)) {
      return savedMarket
    }
  }

  // 2. Browser language detection
  if (typeof navigator !== 'undefined') {
    const language = navigator.language.toLowerCase()
    
    if (language.startsWith('de') || language.includes('de-')) return 'DE'
    if (language.startsWith('en-gb') || language.startsWith('en-uk')) return 'UK'
    if (language.startsWith('en')) return 'US'
  }

  // 3. Timezone-based detection (fallback)
  if (typeof Intl !== 'undefined') {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    
    if (timezone.startsWith('Europe/')) {
      if (timezone.includes('London') || timezone.includes('Dublin')) return 'UK'
      return 'DE' // Default European market
    }
    
    if (timezone.startsWith('America/')) return 'US'
  }

  // 4. Default fallback
  return 'DE' // Default to German market
}

/**
 * Get market-specific currency symbol
 */
export function getMarketCurrency(market: AmazonMarket): string {
  const currencies = {
    DE: '€',
    US: '$',
    UK: '£'
  }
  return currencies[market]
}

/**
 * Get market-specific language code
 */
export function getMarketLanguage(market: AmazonMarket): string {
  const languages = {
    DE: 'de-DE',
    US: 'en-US', 
    UK: 'en-GB'
  }
  return languages[market]
}

/**
 * Get market display name
 */
export function getMarketDisplayName(market: AmazonMarket): string {
  const names = {
    DE: 'Deutschland',
    US: 'United States',
    UK: 'United Kingdom'
  }
  return names[market]
}

/**
 * Set user's preferred market (persisted)
 */
export function setUserMarketPreference(market: AmazonMarket): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('amazon-preferred-market', market)
    // Trigger a custom event for components to react
    window.dispatchEvent(new CustomEvent('amazon-market-changed', { detail: market }))
  }
}