import type { MDXComponents } from 'mdx/types'
import CodeBlock from './components/CodeBlock'
import AmazonCardClient from './components/amazon/AmazonCardClient'
import AmazonGridClient from './components/amazon/AmazonGridClient'
import SmartAmazonCard from './components/amazon/SmartAmazonCard'
import MarketSelector from './components/amazon/MarketSelector'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: CodeBlock,
    // Amazon Affiliate Components (Smart by Default)
    AmazonProduct: SmartAmazonCard,
    AmazonCard: SmartAmazonCard,
    AmazonGrid: AmazonGridClient,
    AmazonGridClient: AmazonGridClient,
    SmartAmazonCard: SmartAmazonCard,
    MarketSelector: MarketSelector,
  }
}
