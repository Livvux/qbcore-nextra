'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import MobileMenu from './MobileMenu'
import MobileMenuButton from './MobileMenuButton'

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  // Transform scroll position to background opacity
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.95])

  const navigationItems = [
    { href: '/quickstart', label: 'Quick Start' },
    { href: '/docs', label: 'Documentation' },
    { href: '/tutorials', label: 'Tutorials' },
    { href: '/scripts', label: 'Scripts' },
    { href: '/inventory', label: 'Inventory' },
    { href: '/hud', label: 'HUD' },
    { href: '/tools', label: 'Tools' },
    { href: '/support', label: 'Support' },
  ]

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: useTransform(
            backgroundOpacity,
            (opacity) => `rgba(0, 0, 0, ${opacity})`
          ),
        }}
      >
        <motion.div
          className="border-b backdrop-blur-md transition-all duration-300"
          style={{
            borderColor: useTransform(
              backgroundOpacity,
              (opacity) => `rgba(255, 255, 255, ${opacity * 0.1})`
            ),
          }}
        >
          <div className="container mx-auto px-6">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-3 transition-opacity hover:opacity-80"
              >
                <img src="/logo.webp" alt="QBCore Framework" className="h-8 w-auto" />
              </Link>

              {/* Desktop Navigation - Hidden on mobile */}
              <nav className="hidden items-center space-x-8 md:flex">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-qbcore group relative text-sm font-medium text-gray-300 transition-colors"
                  >
                    {item.label}
                    <span className="bg-qbcore absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>

              {/* Right Section - GitHub + CTA */}
              <div className="hidden items-center gap-4 md:flex">
                <a
                  href="https://github.com/qbcore-framework"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  <Github className="h-4 w-4" />
                  <span className="hidden lg:block">GitHub</span>
                </a>

                <Link
                  href="/docs/installation/windows"
                  className="bg-qbcore hover:bg-qbcore/80 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Menu Components - Only shown on mobile */}
      <MobileMenuButton
        isOpen={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}

export default Navigation
