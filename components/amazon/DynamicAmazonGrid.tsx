/**
 * Dynamic Amazon Grid that only loads on client side
 * This prevents any server-side execution during build
 */

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import type { AmazonMarket } from '../../lib/types/amazon'

interface AmazonGridProps {
  asins: string[]
  market?: AmazonMarket
  columns?: number
  title?: string
  variant?: 'card' | 'compact'
}

// Loading component for SSR
function AmazonGridSkeleton({ 
  asins, 
  columns = 2, 
  title 
}: { 
  asins: string[], 
  columns?: number, 
  title?: string 
}) {
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

// Dynamically import the client component with SSR disabled
const ClientOnlyAmazonGrid = dynamic(
  () => import('./ClientOnlyAmazonGrid'),
  {
    ssr: false,
    loading: ({ asins, columns, title }: any) => 
      <AmazonGridSkeleton asins={asins} columns={columns} title={title} />
  }
) as ComponentType<AmazonGridProps>

export default ClientOnlyAmazonGrid