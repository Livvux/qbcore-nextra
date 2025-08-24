/**
 * Amazon Product Advertising API v5 Types
 * Compliant with PA API Terms of Use and caching requirements
 */

export type AmazonMarket = 'DE' | 'US' | 'UK'

export interface AmazonProduct {
  /** Amazon Standard Identification Number */
  asin: string
  /** Product title from PA API */
  title: string
  /** Brand name if available */
  brand?: string
  /** Primary product image URL (direct from Amazon CDN) */
  imageUrl?: string
  /** Price and currency information - must be ≤24h old */
  offer?: {
    /** Price amount in cents */
    amount: number
    /** Currency code (EUR, USD, GBP) */
    currency: string
    /** Formatted display string (e.g., "€29.99") */
    display: string
  }
  /** Stock availability status */
  availability?: string
  /** Generated affiliate URL with proper rel attributes */
  affiliateUrl: string
  /** ISO timestamp when data was last fetched from PA API */
  lastFetched: string
  /** Age of offer data in milliseconds (for staleness checking) */
  offerAgeMs: number
  /** Target market for this product data */
  market: AmazonMarket
}

export interface AmazonMarketConfig {
  /** Amazon PA API host for this market */
  host: string
  /** AWS region for this market */
  region: string
  /** Partner tag for affiliate links */
  partnerTag: string
  /** Consumer-facing Amazon domain */
  storefront: string
}

export interface AmazonAPIConfig {
  /** AWS Access Key ID */
  accessKey: string
  /** AWS Secret Access Key */
  secretKey: string
  /** Market configurations */
  markets: Record<AmazonMarket, AmazonMarketConfig>
  /** Cache TTL in seconds (max 86400 per PA API terms) */
  cacheTTLSeconds: number
  /** Staleness threshold in milliseconds */
  staleThresholdMs: number
}

export interface PAAPIResponse {
  /** Response data from GetItems operation */
  ItemsResult?: {
    Items?: PAAPIItem[]
    Errors?: PAAPIError[]
  }
}

export interface PAAPIItem {
  /** Amazon Standard Identification Number */
  ASIN: string
  /** Item information */
  ItemInfo?: {
    Title?: {
      DisplayValue: string
    }
    ByLineInfo?: {
      Brand?: {
        DisplayValue: string
      }
    }
  }
  /** Product images */
  Images?: {
    Primary?: {
      Medium?: {
        URL: string
        Height: number
        Width: number
      }
    }
  }
  /** Offer information */
  Offers?: {
    Listings?: Array<{
      Price?: {
        Amount: number
        Currency: string
        DisplayAmount: string
      }
      Availability?: {
        Message: string
      }
    }>
  }
}

export interface PAAPIError {
  /** Error code from PA API */
  Code: string
  /** Error message */
  Message: string
}

export interface CacheEntry<T> {
  /** Cached data */
  data: T
  /** Cache timestamp */
  timestamp: string
  /** TTL in seconds */
  ttl: number
}

export interface RateLimitConfig {
  /** Requests per interval */
  limit: number
  /** Interval in milliseconds */
  interval: number
  /** Maximum retry attempts */
  maxRetries: number
  /** Base retry delay in milliseconds */
  retryDelay: number
}

export interface APIMetrics {
  /** Total requests made */
  totalRequests: number
  /** Successful requests */
  successfulRequests: number
  /** Failed requests */
  failedRequests: number
  /** Rate limited requests (429) */
  rateLimitedRequests: number
  /** Cache hits */
  cacheHits: number
  /** Cache misses */
  cacheMisses: number
  /** Average response time in ms */
  averageResponseTime: number
}

export interface LogEntry {
  /** Service identifier */
  service: 'amazon-pa-api'
  /** HTTP status code */
  status: number
  /** Target market */
  market: AmazonMarket
  /** Error code if applicable */
  errorCode?: string
  /** Response time in milliseconds */
  responseTime?: number
  /** ISO timestamp */
  timestamp: string
}