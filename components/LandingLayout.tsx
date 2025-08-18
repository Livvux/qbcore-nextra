import React from 'react'

interface LandingLayoutProps {
  children: React.ReactNode
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <img src="/logo.webp" alt="QBCore Framework" className="h-8 w-auto" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/introduction" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Introduction</a>
                <a href="/quickstart" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Quick Start</a>
                <a href="/docs" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Documentation</a>
                <a href="/tutorials" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tutorials</a>
                <a href="/scripts" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Scripts</a>
                <a href="https://github.com/qbcore-framework" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main content */}
      <main className="w-full">
        {children}
      </main>
    </div>
  )
}