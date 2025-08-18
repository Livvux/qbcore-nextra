import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()
  
  // Suggest relevant pages based on the attempted URL
  const getSuggestions = (path: string) => {
    const suggestions = []
    
    if (path.includes('doc') || path.includes('installation')) {
      suggestions.push({ title: 'Documentation', href: '/docs', description: 'Complete QBCore documentation' })
    }
    if (path.includes('tutorial') || path.includes('guide')) {
      suggestions.push({ title: 'Tutorials', href: '/tutorials', description: 'Step-by-step guides' })
    }
    if (path.includes('resource') || path.includes('script')) {
      suggestions.push({ title: 'Resources', href: '/docs/resources', description: 'QBCore resources and scripts' })
    }
    if (path.includes('download') || path.includes('install')) {
      suggestions.push({ title: 'Download', href: '/download', description: 'Get QBCore Framework' })
    }
    
    // Default suggestions if none match
    if (suggestions.length === 0) {
      suggestions.push(
        { title: 'Documentation', href: '/docs', description: 'Complete QBCore documentation' },
        { title: 'Tutorials', href: '/tutorials', description: 'Step-by-step guides' },
        { title: 'Download', href: '/download', description: 'Get QBCore Framework' }
      )
    }
    
    return suggestions
  }
  
  const suggestions = getSuggestions(router.asPath)
  
  return (
    <>
      <Head>
        <title>Page Not Found - QBCore Framework</title>
        <meta 
          name="description" 
          content="The page you're looking for doesn't exist. Find QBCore Framework documentation, tutorials, and resources." 
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://qbcore.net/404" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Page Not Found - QBCore Framework" />
        <meta property="og:description" content="The page you're looking for doesn't exist. Find QBCore Framework documentation, tutorials, and resources." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://qbcore.net/404" />
        <meta property="og:image" content="https://qbcore.net/og-image.svg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Page Not Found - QBCore Framework" />
        <meta name="twitter:description" content="The page you're looking for doesn't exist. Find QBCore Framework documentation, tutorials, and resources." />
        <meta name="twitter:image" content="https://qbcore.net/og-image.svg" />
        
        {/* Structured Data for 404 page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Page Not Found',
              url: 'https://qbcore.net/404',
              mainEntity: {
                '@type': 'Thing',
                name: '404 Error'
              },
              isPartOf: {
                '@type': 'WebSite',
                name: 'QBCore Framework',
                url: 'https://qbcore.net'
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-blue-600/10 rounded-full mb-6">
              <svg
                className="w-16 h-16 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            
            <h1 className="text-8xl font-bold text-blue-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-lg text-gray-400 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Search or Navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors mr-4"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </Link>
            
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
          </div>

          {/* Suggestions */}
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-4 text-center">Maybe you were looking for:</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {suggestions.map((suggestion, index) => (
                <Link
                  key={index}
                  href={suggestion.href}
                  className="block p-4 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 hover:border-blue-500"
                >
                  <h4 className="font-medium text-blue-400 mb-1">{suggestion.title}</h4>
                  <p className="text-sm text-gray-400">{suggestion.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/support"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Support Center
              </Link>
              <Link
                href="/docs"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Documentation
              </Link>
              <a
                href="https://github.com/qbcore-framework"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://discord.gg/qbcore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Discord Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}