import React from 'react'
import { Github, BookOpen, Users, ExternalLink, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    documentation: [
      { label: 'Getting Started', href: '/tutorials/getting-started' },
      { label: 'Installation', href: '/docs/installation' },
      { label: 'Quick Start', href: '/quickstart' },
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Tutorials', href: '/tutorials' }
    ],
    resources: [
      { label: 'GitHub', href: 'https://github.com/qbcore-framework', icon: Github },
      { label: 'Documentation', href: '/docs', icon: BookOpen },
      { label: 'Support', href: '/support', icon: Users }
    ],
    legal: [
      { label: 'Download', href: '/download' },
      { label: 'Tools', href: '/tools' },
      { label: 'Scripts', href: '/scripts' },
      { label: 'Inventory', href: '/inventory' }
    ]
  }

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-black/80 backdrop-blur-md">
      <div className="bg-mesh absolute inset-0 opacity-30" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/logo.webp" 
                alt="QBCore Framework" 
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl font-bold text-white">QBCore Framework</span>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              The most popular FiveM framework trusted by{' '}
              <span className="text-qbcore font-semibold">5,000+ servers</span>{' '}
              worldwide to create immersive roleplay experiences.
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
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-300 hover:border-qbcore/50 hover:bg-qbcore/10 hover:text-white"
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
            <h3 className="text-lg font-semibold text-white mb-6">Documentation</h3>
            <ul className="space-y-3">
              {footerLinks.documentation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 transition-colors duration-200 hover:text-qbcore"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 transition-colors duration-200 hover:text-qbcore"
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
              <h3 className="text-xl font-semibold text-white mb-2">
                Stay updated with QBCore
              </h3>
              <p className="text-gray-300">
                Get the latest updates, releases, and community highlights delivered to your inbox.
              </p>
            </div>
            
            <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm focus:border-qbcore focus:outline-none focus:ring-1 focus:ring-qbcore"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row">
          <div className="flex items-center gap-2 text-gray-300">
            <span>© {currentYear} QBCore Framework. Made with</span>
            <Heart className="h-4 w-4 fill-qbcore text-qbcore" />
            <span>by the community.</span>
          </div>
          
          <div className="mt-4 flex items-center gap-6 text-sm text-gray-400 md:mt-0">
            <span>Version 1.0.0</span>
            <span>•</span>
            <a 
              href="https://github.com/qbcore-framework" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-colors hover:text-qbcore"
            >
              Open Source
            </a>
            <span>•</span>
            <a 
              href="/support" 
              className="transition-colors hover:text-qbcore"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer