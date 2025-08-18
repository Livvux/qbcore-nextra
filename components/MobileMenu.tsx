'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Github, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const navigationItems = [
    { href: '/quickstart', label: 'Quick Start' },
    { href: '/docs', label: 'Documentation' },
    { href: '/tutorials', label: 'Tutorials' },
    { href: '/scripts', label: 'Scripts' },
    { href: '/inventory', label: 'Inventory System' },
    { href: '/hud', label: 'HUD Collection' },
    { href: '/tools', label: 'Tools' },
    { href: '/support', label: 'Support' },
  ]

  const socialLinks = [
    {
      href: 'https://github.com/qbcore-framework',
      icon: Github,
      label: 'GitHub',
    },
  ]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] overflow-y-auto border-l border-white/10 bg-black/95 backdrop-blur-xl md:hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            {/* Menu Content */}
            <div className="flex h-full flex-col pb-8 pt-20">
              {/* Navigation Links */}
              <motion.nav
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 px-6"
              >
                <motion.div variants={itemVariants} className="mb-8 text-center">
                  <img src="/logo.webp" alt="QBCore Framework" className="mx-auto h-12 w-auto" />
                </motion.div>

                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <motion.div key={item.href} variants={itemVariants}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="hover:text-qbcore block rounded-lg px-4 py-3 text-lg font-medium text-white transition-colors hover:bg-white/5"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.nav>

              {/* Social Links */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="px-6"
              >
                <motion.div variants={itemVariants} className="mb-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:border-qbcore/30 hover:bg-qbcore/10 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors"
                    >
                      <social.icon className="h-4 w-4" />
                      {social.label}
                    </a>
                  ))}
                </motion.div>

                <motion.div variants={itemVariants} className="mt-4 text-center">
                  <p className="text-xs text-gray-400">© 2025 QBCore Framework</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
