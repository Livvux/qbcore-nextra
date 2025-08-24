/**
 * Amazon PA API Logger
 * Logs API interactions without exposing PII
 */

import type { LogEntry, AmazonMarket, APIMetrics } from '../types/amazon'

// In-memory metrics for development
// In production, use Redis, database, or monitoring service
const metrics: APIMetrics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  rateLimitedRequests: 0,
  cacheHits: 0,
  cacheMisses: 0,
  averageResponseTime: 0
}

const responseTimes: number[] = []

/**
 * Log API call without exposing PII
 * 
 * @param status - HTTP status code
 * @param market - Target market
 * @param errorCode - Error code if applicable
 * @param responseTime - Response time in milliseconds
 */
export function logAPICall(
  status: number,
  market: AmazonMarket,
  errorCode?: string,
  responseTime?: number
): void {
  const logEntry: LogEntry = {
    service: 'amazon-pa-api',
    status,
    market,
    errorCode,
    responseTime,
    timestamp: new Date().toISOString()
  }

  // Log to console (structured logging)
  console.log(JSON.stringify(logEntry))

  // Update metrics
  updateMetrics(status, responseTime)

  // In production, send to monitoring service
  // await sendToMonitoring(logEntry)
}

/**
 * Update internal metrics
 */
function updateMetrics(status: number, responseTime?: number): void {
  metrics.totalRequests++

  if (status >= 200 && status < 300) {
    metrics.successfulRequests++
  } else {
    metrics.failedRequests++
  }

  if (status === 429) {
    metrics.rateLimitedRequests++
  }

  if (responseTime) {
    responseTimes.push(responseTime)
    // Keep only last 1000 response times for average calculation
    if (responseTimes.length > 1000) {
      responseTimes.shift()
    }
    
    metrics.averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
  }
}

/**
 * Log cache hit/miss for monitoring
 * 
 * @param hit - Whether it was a cache hit
 * @param key - Cache key (will be sanitized)
 */
export function logCacheAccess(hit: boolean, key: string): void {
  if (hit) {
    metrics.cacheHits++
  } else {
    metrics.cacheMisses++
  }

  // Sanitize cache key (remove ASIN for privacy)
  const sanitizedKey = key.replace(/:[A-Z0-9]{10}/g, ':***')
  
  console.log(JSON.stringify({
    service: 'amazon-cache',
    event: hit ? 'hit' : 'miss',
    key: sanitizedKey,
    timestamp: new Date().toISOString()
  }))
}

/**
 * Log rate limiting event
 * 
 * @param market - Target market
 * @param retryAfter - Retry-After header value
 * @param requestsInQueue - Number of requests waiting
 */
export function logRateLimit(
  market: AmazonMarket,
  retryAfter?: string,
  requestsInQueue?: number
): void {
  console.log(JSON.stringify({
    service: 'amazon-rate-limiter',
    event: 'rate_limited',
    market,
    retryAfter,
    requestsInQueue,
    timestamp: new Date().toISOString()
  }))
}

/**
 * Log error without exposing sensitive data
 * 
 * @param error - Error object or message
 * @param context - Additional context
 */
export function logError(
  error: Error | string,
  context?: Record<string, any>
): void {
  const message = error instanceof Error ? error.message : error
  
  // Sanitize context to remove sensitive data
  const sanitizedContext = context ? sanitizeContext(context) : undefined
  
  console.error(JSON.stringify({
    service: 'amazon-pa-api',
    event: 'error',
    message,
    context: sanitizedContext,
    timestamp: new Date().toISOString()
  }))
}

/**
 * Remove sensitive data from context
 */
function sanitizeContext(context: Record<string, any>): Record<string, any> {
  const sanitized = { ...context }
  
  // Remove/mask sensitive fields
  const sensitiveFields = ['accessKey', 'secretKey', 'authorization', 'signature']
  
  for (const field of sensitiveFields) {
    if (sanitized[field]) {
      sanitized[field] = '***'
    }
  }
  
  // Sanitize ASINs in nested objects
  const jsonString = JSON.stringify(sanitized)
  const sanitizedString = jsonString.replace(/[A-Z0-9]{10}/g, '***')
  
  return JSON.parse(sanitizedString)
}

/**
 * Get current metrics for monitoring dashboard
 * 
 * @returns Current API metrics
 */
export function getMetrics(): APIMetrics {
  const hitRate = metrics.cacheHits + metrics.cacheMisses > 0 
    ? metrics.cacheHits / (metrics.cacheHits + metrics.cacheMisses)
    : 0

  return {
    ...metrics,
    cacheHitRate: hitRate
  } as APIMetrics & { cacheHitRate: number }
}

/**
 * Reset metrics (for testing/development)
 */
export function resetMetrics(): void {
  metrics.totalRequests = 0
  metrics.successfulRequests = 0
  metrics.failedRequests = 0
  metrics.rateLimitedRequests = 0
  metrics.cacheHits = 0
  metrics.cacheMisses = 0
  metrics.averageResponseTime = 0
  responseTimes.length = 0
}

/**
 * Log performance metrics periodically
 */
export function logPerformanceMetrics(): void {
  const currentMetrics = getMetrics()
  
  console.log(JSON.stringify({
    service: 'amazon-pa-api',
    event: 'performance_metrics',
    metrics: currentMetrics,
    timestamp: new Date().toISOString()
  }))
}

// Log metrics every 5 minutes in production
if (process.env.NODE_ENV === 'production') {
  setInterval(logPerformanceMetrics, 5 * 60 * 1000)
}