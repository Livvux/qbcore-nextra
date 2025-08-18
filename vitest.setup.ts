import '@testing-library/jest-dom'
import { beforeAll, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import React from 'react'

// Mock Next.js router
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    reload: vi.fn(),
    asPath: '/',
    pathname: '/',
    query: {},
    isReady: true,
  }),
}))

// Mock Next.js link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: unknown) => {
    return React.createElement('a', { href, ...props }, children)
  },
}))

// Mock framer-motion for simpler testing
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: unknown) => React.createElement('div', props, children),
    section: ({ children, ...props }: unknown) => React.createElement('section', props, children),
    h1: ({ children, ...props }: unknown) => React.createElement('h1', props, children),
    p: ({ children, ...props }: unknown) => React.createElement('p', props, children),
  },
}))

// Clean up after each test
afterEach(() => {
  cleanup()
})

// Set up globals for happy-dom
beforeAll(() => {
  // Add any global setup here
})
