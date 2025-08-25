/**
 * Dynamic Amazon Card that only loads on client side
 * This prevents any server-side execution during build
 */

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import type { AmazonMarket } from '../../lib/types/amazon'

interface AmazonCardProps {
  asin: string
  market?: AmazonMarket
  variant?: 'card' | 'compact' | 'inline'
  campaign?: string
}

// Loading component for SSR
function AmazonCardSkeleton({ variant = 'card', asin }: { variant?: string, asin?: string }) {
  if (variant === 'inline') {
    return (
      <span className="inline-flex items-center gap-2 text-blue-600">
        <span>Loading product... ({asin})</span>
      </span>
    )
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3 p-3 border rounded-lg animate-pulse">
        <div className="w-[60px] h-[60px] bg-gray-200 rounded flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-1/2 bg-gray-200 rounded mb-2"></div>
          <div className="h-5 w-1/4 bg-gray-200 rounded"></div>
        </div>
        <div className="h-9 w-20 bg-gray-200 rounded flex-shrink-0"></div>
      </div>
    )
  }

  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-sm animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
      <div className="p-4">
        <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-1/2 bg-gray-200 rounded mb-3"></div>
        <div className="h-8 w-1/3 bg-gray-200 rounded mb-3"></div>
        <div className="h-10 w-full bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

// Dynamically import the client component with SSR disabled
const ClientOnlyAmazonCard = dynamic(
  () => import('./ClientOnlyAmazonCard'),
  {
    ssr: false,
    loading: ({ variant, asin }: any) => <AmazonCardSkeleton variant={variant} asin={asin} />
  }
) as ComponentType<AmazonCardProps>

export default ClientOnlyAmazonCard