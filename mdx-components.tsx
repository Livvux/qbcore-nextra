import type { MDXComponents } from 'mdx/types'
import CodeBlock from './components/CodeBlock'

// Placeholder component for build-time safety
const BuildPlaceholder = ({ children, ...props }: any) => (
  <div className="p-4 border border-gray-300 bg-gray-50 rounded">
    <p className="text-sm text-gray-600">Component temporarily disabled during build</p>
  </div>
)

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: CodeBlock,
    // Amazon Affiliate Components (temporarily disabled for build)
    AmazonProduct: BuildPlaceholder,
    AmazonCard: BuildPlaceholder,
    AmazonGrid: BuildPlaceholder,
    AmazonGridClient: BuildPlaceholder,
    SmartAmazonCard: BuildPlaceholder,
    MarketSelector: BuildPlaceholder,
  }
}
