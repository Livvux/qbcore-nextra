/**
 * Amazon API Metrics Endpoint
 * Provides monitoring data for the Amazon integration
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import { getMetrics } from '../../../lib/amazon/logger'
import { getRateLimiterStats } from '../../../lib/amazon/rate-limiter'
import { getCacheStats } from '../../../lib/amazon/cache'

interface MetricsResponse {
  api: ReturnType<typeof getMetrics>
  rateLimiter: ReturnType<typeof getRateLimiterStats>
  cache: Awaited<ReturnType<typeof getCacheStats>>
  timestamp: string
  uptime: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MetricsResponse | { error: string }>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  try {
    // Gather metrics from all components
    const [apiMetrics, rateLimiterStats, cacheStats] = await Promise.all([
      getMetrics(),
      getRateLimiterStats(),
      getCacheStats()
    ])

    const metrics: MetricsResponse = {
      api: apiMetrics,
      rateLimiter: rateLimiterStats,
      cache: cacheStats,
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }

    // Set cache headers to prevent caching of metrics
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')

    return res.status(200).json(metrics)

  } catch (error) {
    console.error('Error fetching metrics:', error)
    return res.status(500).json({ 
      error: 'Failed to fetch metrics' 
    })
  }
}