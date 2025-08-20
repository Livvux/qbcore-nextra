import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Navigation from '../Navigation'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (target, prop) => {
        if (typeof prop === 'string') {
          // eslint-disable-next-line react/display-name
          return ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
            const { 
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              initial, 
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              animate, 
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              exit, 
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              whileInView, 
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              viewport, 
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              variants, 
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              transition, 
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
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => 'rgba(0, 0, 0, 0)',
}))

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => <a href={href} {...props}>{children}</a>,
}))

// Mock child components
vi.mock('../MobileMenu', () => ({
  default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => 
    isOpen ? <div data-testid="mobile-menu">Mobile Menu <button onClick={onClose}>Close</button></div> : null
}))

vi.mock('../MobileMenuButton', () => ({
  default: ({ onClick }: { onClick: () => void }) => <button data-testid="mobile-menu-button" onClick={onClick}>Menu</button>
}))

describe('Navigation', () => {
  it('renders navigation items', () => {
    render(<Navigation />)

    expect(screen.getByText('Quick Start')).toBeInTheDocument()
    expect(screen.getByText('Documentation')).toBeInTheDocument()
    expect(screen.getByText('Tutorials')).toBeInTheDocument()
    expect(screen.getByText('Scripts')).toBeInTheDocument()
    expect(screen.getByText('Support')).toBeInTheDocument()
  })

  it('renders QBCore logo link', () => {
    render(<Navigation />)

    const logoLink = screen.getByRole('link', { name: /qbcore framework/i })
    expect(logoLink).toBeInTheDocument()
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders GitHub link', () => {
    render(<Navigation />)

    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/qbcore-framework')
  })

  it('opens and closes mobile menu', () => {
    render(<Navigation />)

    // Mobile menu should be closed initially
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()

    // Click mobile menu button
    const menuButton = screen.getByTestId('mobile-menu-button')
    fireEvent.click(menuButton)

    // Mobile menu should be open
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument()

    // Close mobile menu
    const closeButton = screen.getByText('Close')
    fireEvent.click(closeButton)

    // Mobile menu should be closed
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
  })

  it('closes mobile menu on window resize to desktop', () => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600, // Mobile width
    })

    render(<Navigation />)

    // Open mobile menu
    const menuButton = screen.getByTestId('mobile-menu-button')
    fireEvent.click(menuButton)
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument()

    // Simulate window resize to desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024, // Desktop width
    })

    // Trigger resize event
    fireEvent(window, new Event('resize'))

    // Mobile menu should be closed
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
  })
})