'use client'

import { motion } from 'framer-motion'
import { Code, Download, Users, Zap, Copy } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

const Hero = () => {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        'git clone https://github.com/qbcore-framework/qb-core.git'
      )
      setCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = 'git clone https://github.com/qbcore-framework/qb-core.git'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setCopied(false), 2000)
      } catch {
        // Fallback copy failed silently
      }
      document.body.removeChild(textArea)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black pt-16">
      {/* Background Elements */}
      <div className="grid-pattern absolute inset-0 opacity-40"></div>
      <div className="bg-mesh absolute inset-0 opacity-60"></div>
      <div className="absolute inset-0">
        <div
          className="animate-float absolute left-1/4 top-1/4 h-96 w-96 rounded-full opacity-30 mix-blend-multiply blur-3xl filter"
          style={{ background: 'radial-gradient(circle, #DB123E 0%, transparent 70%)' }}
        ></div>
        <div
          className="animate-float absolute right-1/4 top-1/3 h-80 w-80 rounded-full opacity-20 mix-blend-multiply blur-3xl filter"
          style={{
            animationDelay: '2s',
            background: 'radial-gradient(circle, #FF4B6E 0%, transparent 70%)',
          }}
        ></div>
        <div
          className="animate-float absolute bottom-1/4 left-1/3 h-72 w-72 rounded-full opacity-25 mix-blend-multiply blur-3xl filter"
          style={{
            animationDelay: '4s',
            background: 'radial-gradient(circle, #DB123E 0%, transparent 70%)',
          }}
        ></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 py-12 text-center">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="mx-auto max-w-5xl"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm"
          >
            <Zap className="text-qbcore h-4 w-4" />
            <span className="text-sm font-medium text-gray-300">The #1 FiveM Framework</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            className="mb-8 text-5xl font-black leading-tight text-white md:text-7xl lg:text-8xl"
          >
            Build Amazing <span className="emoji-float inline-block">🚔</span>{' '}
            <span className="hero-text">Roleplay Servers</span>{' '}
            <span className="emoji-float inline-block" style={{ animationDelay: '1s' }}>
              🎮
            </span>{' '}
            with QBCore{' '}
            <span className="emoji-float inline-block" style={{ animationDelay: '2s' }}>
              ⚡
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-12 max-w-4xl text-xl leading-relaxed text-gray-400 md:text-2xl"
          >
            The most popular and feature-rich FiveM framework. Used by{' '}
            <span className="text-qbcore font-bold">5,000+ servers</span> worldwide to create
            immersive gaming experiences.
          </motion.p>

          {/* Terminal Command */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="terminal-window mx-auto max-w-2xl">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500"></div>
                <div className="terminal-dot bg-yellow-500"></div>
                <div className="terminal-dot bg-green-500"></div>
                <span className="ml-4 text-sm text-gray-400">Terminal</span>
              </div>
              <div className="terminal-content">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-qbcore">$</span>
                    <span className="text-white">
                      git clone https://github.com/qbcore-framework/qb-core.git
                    </span>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 rounded px-3 py-1 text-xs text-gray-400 transition-colors hover:text-white"
                  >
                    <Copy className="h-3 w-3" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature Pills */}
          <motion.div variants={fadeInUp} className="mb-16 flex flex-wrap justify-center gap-4">
            {[
              { icon: Users, text: 'Player Management' },
              { icon: Code, text: 'Modular Design' },
              { icon: Zap, text: 'High Performance' },
            ].map((feature, index) => (
              <div
                key={index}
                className="hover:border-qbcore/30 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm transition-colors"
              >
                <feature.icon className="text-qbcore h-4 w-4" />
                <span className="text-sm font-medium text-gray-300">{feature.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link href="/docs/installation/windows" className="btn-primary text-center">
              <Download className="mr-2 inline-block h-5 w-5" />
              Get Started
            </Link>
            <Link href="/docs" className="btn-secondary text-center">
              <Code className="mr-2 inline-block h-5 w-5" />
              Documentation
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3"
          >
            {[
              { number: '5,000+', label: 'Active Servers' },
              { number: '50,000+', label: 'Downloads' },
              { number: '100+', label: 'Resources' },
            ].map((stat, index) => (
              <div key={index} className="group text-center">
                <div className="group-hover:text-qbcore mb-3 font-mono text-4xl font-black text-white transition-colors md:text-5xl">
                  {stat.number}
                </div>
                <div className="font-medium tracking-wide text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
      >
        <div className="hover:border-qbcore flex h-10 w-6 justify-center rounded-full border-2 border-gray-600 transition-colors">
          <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-gray-600"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
