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
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
    [key: string]: any
  }) => {
    return React.createElement('a', { href, ...props }, children)
  },
}))

// Mock framer-motion for simpler testing
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (target, prop) => {
        if (typeof prop === 'string') {
          return ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => {
            // Filter out framer-motion specific props
            const {
              initial,
              animate,
              exit,
              whileInView,
              viewport,
              variants,
              transition,
              onViewportEnter,
              onViewportLeave,
              style,
              ...domProps
            } = props
            return React.createElement(prop, { ...domProps, style }, children)
          }
        }
        return target[prop as keyof typeof target]
      }
    }
  ),
  useTransform: vi.fn(() => ({
    get: () => 'rgba(0, 0, 0, 0)',
    on: vi.fn(),
    off: vi.fn(),
  })),
  useScroll: vi.fn(() => ({ scrollY: { get: () => 0, on: vi.fn(), off: vi.fn() } })),
  AnimatePresence: ({ children }: { children?: React.ReactNode }) => React.createElement('div', {}, children),
}))

// Clean up after each test
afterEach(() => {
  cleanup()
})

// Set up globals for happy-dom
beforeAll(() => {
  // Add any global setup here
})
