'use client'

/**
 * Client-side wrapper for Amazon components
 * Prevents server-side execution during static generation
 */

import { Suspense, lazy } from 'react'
import type { AmazonMarket } from '../../lib/types/amazon'

interface AmazonCardProps {
  /** Amazon Standard Identification Number */
  asin: string
  /** Target market for product data and affiliate links */
  market?: AmazonMarket
  /** Display variant */
  variant?: 'card' | 'compact' | 'inline'
  /** Optional campaign tracking */
  campaign?: string
}

// Dynamically import the client component to prevent SSR execution
const AmazonCardClient = lazy(() => import('./AmazonCardClient'))

function LoadingSkeleton({ variant = 'card' }: { variant?: 'card' | 'compact' | 'inline' }) {
  if (variant === 'inline') {
    return (
      <span className="inline-flex items-center gap-2 text-gray-400">
        <span className="h-4 w-24 bg-gray-200 rounded animate-pulse"></span>
        <span className="h-4 w-16 bg-gray-200 rounded animate-pulse"></span>
      </span>
    )
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3 p-3 border rounded-lg">
        <div className="w-[60px] h-[60px] bg-gray-200 rounded animate-pulse flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-3 w-1/2 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-9 w-20 bg-gray-200 rounded animate-pulse flex-shrink-0"></div>
      </div>
    )
  }

  // Default card skeleton
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="aspect-square relative overflow-hidden rounded-t-lg bg-gray-200 animate-pulse"></div>
      <div className="p-4">
        <div className="mb-2">
          <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="mb-3">
          <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  )
}

/**
 * Amazon Product Card Wrapper
 * Client-side wrapper that prevents server-side execution during static generation
 */
export default function AmazonCardWrapper(props: AmazonCardProps) {
  return (
    <Suspense fallback={<LoadingSkeleton variant={props.variant} />}>
      <AmazonCardClient {...props} />
    </Suspense>
  )
}