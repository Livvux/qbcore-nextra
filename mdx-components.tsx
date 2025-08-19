import type { MDXComponents } from 'mdx/types'
import CodeBlock from './components/CodeBlock'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: CodeBlock,
  }
}
