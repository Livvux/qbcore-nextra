'use client'

import { useState, useRef } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode
}

const CodeBlock = ({ children, className, ...props }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)

  const handleCopy = async () => {
    if (!preRef.current) return
    
    const textContent = preRef.current.textContent || ''
    
    try {
      await navigator.clipboard.writeText(textContent)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className="relative group">
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md bg-gray-700/80 px-2.5 py-1.5 text-xs text-gray-300 opacity-0 transition-all duration-200 hover:bg-gray-600/80 hover:text-white group-hover:opacity-100 backdrop-blur-sm border border-gray-600/50"
        title="Copy code"
      >
        {isCopied ? (
          <>
            <Check className="h-3 w-3" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  )
}

export default CodeBlock