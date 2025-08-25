import type { MDXComponents } from 'mdx/types'
import CodeBlock from './components/CodeBlock'

// Basic placeholder component that's completely build-safe
const AmazonPlaceholder = () => {
  return (
    <div className="p-4 border border-gray-300 bg-gray-50 rounded-md">
      <div className="flex items-center justify-center min-h-[100px]">
        <div className="text-center">
          <div className="text-4xl mb-2">📦</div>
          <p className="text-sm text-gray-600">Amazon Product</p>
          <p className="text-xs text-gray-500 mt-1">Loading...</p>
        </div>
      </div>
    </div>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: CodeBlock,
    // Amazon Affiliate Components (build-safe placeholders)
    AmazonProduct: AmazonPlaceholder,
    AmazonCard: AmazonPlaceholder,
    AmazonGrid: AmazonPlaceholder,
    AmazonGridClient: AmazonPlaceholder,
    SmartAmazonCard: AmazonPlaceholder,
    MarketSelector: AmazonPlaceholder,
  }
}
