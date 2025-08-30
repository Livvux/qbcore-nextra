import React, { useState } from 'react'
import { Github, BookOpen, Users, ExternalLink, Heart, Loader2, Check, AlertCircle } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  const footerLinks = {
    documentation: [
      { label: 'Getting Started', href: '/tutorials/getting-started' },
      { label: 'Installation', href: '/docs/installation' },
      { label: 'Quick Start', href: '/quickstart' },
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Tutorials', href: '/tutorials' },
    ],
    resources: [
      { label: 'GitHub', href: 'https://github.com/qbcore-framework', icon: Github },
      { label: 'Documentation', href: '/docs', icon: BookOpen },
      { label: 'Support', href: '/support', icon: Users },
    ],
    legal: [
      { label: 'Download', href: '/download' },
      { label: 'Tools', href: '/tools' },
      { label: 'Scripts', href: '/scripts' },
      { label: 'Inventory', href: '/inventory' },
    ],
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setMessage('Please enter your email address')
      setMessageType('error')
      return
    }

    if (!validateEmail(email.trim())) {
      setMessage('Please enter a valid email address')
      setMessageType('error')
      return
    }

    setIsLoading(true)
    setMessage('')
    setMessageType('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage(data.message)
        setMessageType('success')
        setEmail('')
        
        // Clear message after 5 seconds
        setTimeout(() => {
          setMessage('')
          setMessageType('')
        }, 5000)
      } else {
        setMessage(data.message || 'Failed to subscribe. Please try again.')
        setMessageType('error')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setMessage('Network error. Please check your connection and try again.')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-black/80 backdrop-blur-md">
      {/* Background mesh removed to show GradientBlinds */}

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <img src="/logo.webp" alt="QBCore Framework" className="h-10 w-auto object-contain" />
              <span className="text-xl font-bold text-white">QBCore Framework</span>
            </div>

            <p className="mb-6 max-w-md text-lg leading-relaxed text-gray-300">
              The most popular FiveM framework trusted by{' '}
              <span className="text-qbcore font-semibold">5,000+ servers</span> worldwide to create
              immersive roleplay experiences.
            </p>

            <div className="flex flex-wrap gap-4">
              {footerLinks.resources.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="hover:border-qbcore/50 hover:bg-qbcore/10 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-300 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                    {link.href.startsWith('http') && <ExternalLink className="h-3 w-3" />}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Documentation Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Documentation</h3>
            <ul className="space-y-3">
              {footerLinks.documentation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-qbcore text-gray-300 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-qbcore text-gray-300 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div className="flex flex-col items-center text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="mb-6 lg:mb-0">
              <h3 className="mb-2 text-xl font-semibold text-white">Stay updated with QBCore</h3>
              <p className="text-gray-300">
                Get the latest updates, releases, and community highlights delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="focus:border-qbcore focus:ring-qbcore flex-1 rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="btn-primary whitespace-nowrap flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
              
              {message && (
                <div className={`mt-3 flex items-center gap-2 text-sm ${
                  messageType === 'success' 
                    ? 'text-green-400' 
                    : 'text-red-400'
                }`}>
                  {messageType === 'success' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row">
          <div className="flex items-center gap-2 text-gray-300">
            <span>© {currentYear} QBCore Framework. Made with</span>
            <Heart className="fill-qbcore text-qbcore h-4 w-4" />
            <span>by the community.</span>
          </div>

          <div className="mt-4 flex items-center gap-6 text-sm text-gray-400 md:mt-0">
            <span>Version 1.0.0</span>
            <span>•</span>
            <a
              href="https://github.com/qbcore-framework"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-qbcore transition-colors"
            >
              Open Source
            </a>
            <span>•</span>
            <a href="/support" className="hover:text-qbcore transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
