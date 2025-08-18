'use client'

import { motion } from 'framer-motion'
import { Code, Download, Users, Zap, Copy } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const Hero = () => {
  const [copied, setCopied] = useState(false)

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
      await navigator.clipboard.writeText('git clone https://github.com/qbcore-framework/qb-core.git')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = 'git clone https://github.com/qbcore-framework/qb-core.git'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        console.error('Failed to copy text: ', err)
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black pt-16">
      {/* Background Elements */}
      <div className="grid-pattern absolute inset-0 opacity-40"></div>
      <div className="bg-mesh absolute inset-0 opacity-60"></div>
      <div className="absolute inset-0">
        <div className="animate-float absolute top-1/4 left-1/4 h-96 w-96 rounded-full opacity-30 mix-blend-multiply blur-3xl filter" style={{ background: 'radial-gradient(circle, #DB123E 0%, transparent 70%)' }}></div>
        <div
          className="animate-float absolute top-1/3 right-1/4 h-80 w-80 rounded-full opacity-20 mix-blend-multiply blur-3xl filter"
          style={{ animationDelay: '2s', background: 'radial-gradient(circle, #FF4B6E 0%, transparent 70%)' }}
        ></div>
        <div
          className="animate-float absolute bottom-1/4 left-1/3 h-72 w-72 rounded-full opacity-25 mix-blend-multiply blur-3xl filter"
          style={{ animationDelay: '4s', background: 'radial-gradient(circle, #DB123E 0%, transparent 70%)' }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center py-12">
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
            <Zap className="h-4 w-4 text-qbcore" />
            <span className="text-sm font-medium text-gray-300">The #1 FiveM Framework</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            className="mb-8 text-5xl leading-tight font-black text-white md:text-7xl lg:text-8xl"
          >
            Build Amazing{' '}
            <span className="emoji-float inline-block">🚔</span>{' '}
            <span className="hero-text">Roleplay Servers</span>{' '}
            <span className="emoji-float inline-block" style={{ animationDelay: '1s' }}>🎮</span>{' '}
            with QBCore{' '}
            <span className="emoji-float inline-block" style={{ animationDelay: '2s' }}>⚡</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-12 max-w-4xl text-xl leading-relaxed text-gray-400 md:text-2xl"
          >
            The most popular and feature-rich FiveM framework. Used by{' '}
            <span className="font-bold text-qbcore">5,000+ servers</span> worldwide to create
            immersive gaming experiences.
          </motion.p>

          {/* Terminal Command */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="terminal-window mx-auto max-w-2xl">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500"></div>
                <div className="terminal-dot bg-yellow-500"></div>
                <div className="terminal-dot bg-green-500"></div>
                <span className="text-gray-400 text-sm ml-4">Terminal</span>
              </div>
              <div className="terminal-content">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-qbcore">$</span>
                    <span className="text-white">git clone https://github.com/qbcore-framework/qb-core.git</span>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 rounded px-3 py-1 text-xs text-gray-400 hover:text-white transition-colors"
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
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm hover:border-qbcore/30 transition-colors"
              >
                <feature.icon className="h-4 w-4 text-qbcore" />
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
              <div key={index} className="text-center group">
                <div className="mb-3 text-4xl font-black text-white md:text-5xl font-mono group-hover:text-qbcore transition-colors">{stat.number}</div>
                <div className="text-gray-400 font-medium tracking-wide">{stat.label}</div>
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
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-gray-600 hover:border-qbcore transition-colors">
          <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-gray-600"></div>
        </div>
      </motion.div>

    </section>
  )
}

export default Hero
