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
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => {
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
        ...domProps
      } = props
      return React.createElement('div', domProps, children)
    },
    section: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => {
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
        ...domProps
      } = props
      return React.createElement('section', domProps, children)
    },
    h1: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => {
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
        ...domProps
      } = props
      return React.createElement('h1', domProps, children)
    },
    p: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => {
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
        ...domProps
      } = props
      return React.createElement('p', domProps, children)
    },
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
