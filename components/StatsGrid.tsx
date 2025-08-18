'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Server, Download, Users, GitFork, Star, Eye } from 'lucide-react'

const StatsGrid = () => {
  const [typedText, setTypedText] = useState('')

  const stats = [
    {
      id: 'servers',
      icon: Server,
      label: 'Active Servers',
      value: '5,000+',
      command: 'qb-stats --servers',
      description: 'Servers running QBCore worldwide',
    },
    {
      id: 'downloads',
      icon: Download,
      label: 'Total Downloads',
      value: '50,000+',
      command: 'qb-stats --downloads',
      description: 'Framework installations to date',
    },
    {
      id: 'players',
      icon: Users,
      label: 'Active Players',
      value: '100,000+',
      command: 'qb-stats --players',
      description: 'Players online across all servers',
    },
    {
      id: 'contributors',
      icon: GitFork,
      label: 'Contributors',
      value: '150+',
      command: 'qb-stats --contributors',
      description: 'Developers contributing to QBCore',
    },
    {
      id: 'stars',
      icon: Star,
      label: 'GitHub Stars',
      value: '2,500+',
      command: 'qb-stats --stars',
      description: 'Stars on GitHub repositories',
    },
    {
      id: 'resources',
      icon: Eye,
      label: 'Resources',
      value: '200+',
      command: 'qb-stats --resources',
      description: 'Available resources and plugins',
    },
  ]

  useEffect(() => {
    const terminalCommands = [
      '$ qb-framework --version',
      'QBCore Framework v2.0.0',
      '$ qb-framework --status',
      'Status: Active ✅',
      'Uptime: 99.9%',
      'Performance: Optimal',
      '$ qb-stats --overview',
      'Generating statistics overview...',
      '',
    ]

    let currentIndex = 0
    let currentChar = 0
    let timeoutId: NodeJS.Timeout

    const typeWriter = () => {
      if (currentIndex < terminalCommands.length) {
        const currentCommand = terminalCommands[currentIndex]

        if (currentChar <= currentCommand.length) {
          setTypedText(
            terminalCommands.slice(0, currentIndex).join('\n') +
              (currentIndex > 0 ? '\n' : '') +
              currentCommand.substring(0, currentChar)
          )
          currentChar++
          timeoutId = setTimeout(typeWriter, 50)
        } else if (currentChar > currentCommand.length) {
          setTimeout(() => {
            currentIndex++
            currentChar = 0
            typeWriter()
          }, 500)
        }
      } else {
        // Reset after all commands are typed
        setTimeout(() => {
          currentIndex = 0
          currentChar = 0
          setTypedText('')
          typeWriter()
        }, 3000)
      }
    }

    typeWriter()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="relative overflow-hidden bg-black py-24">
      {/* Background Elements */}
      <div className="grid-pattern absolute inset-0 opacity-20"></div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Terminal Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">
              Trusted by the <span className="text-gradient">Community</span> 📊
            </h2>
            <p className="mb-8 text-xl text-gray-400">
              See the real numbers behind QBCore&apos;s success. Our framework powers thousands of
              servers and brings joy to hundreds of thousands of players.
            </p>

            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500"></div>
                <div className="terminal-dot bg-yellow-500"></div>
                <div className="terminal-dot bg-green-500"></div>
                <span className="ml-4 text-sm text-gray-400">qb-terminal</span>
              </div>
              <div className="terminal-content min-h-[300px]">
                <pre className="whitespace-pre-wrap text-gray-300">
                  {typedText}
                  <span className="bg-qbcore ml-1 inline-block h-5 w-2 animate-pulse"></span>
                </pre>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="feature-card group cursor-pointer text-center"
              >
                <div className="mb-4 flex items-center justify-center">
                  <div className="bg-qbcore/10 border-qbcore/20 group-hover:bg-qbcore/20 rounded-lg border p-3 transition-colors">
                    <stat.icon className="text-qbcore h-6 w-6" />
                  </div>
                </div>

                <div className="group-hover:text-qbcore mb-2 font-mono text-3xl font-black text-white transition-colors">
                  {stat.value}
                </div>

                <div className="mb-2 text-sm font-medium text-gray-400">{stat.label}</div>

                <div className="text-xs text-gray-500 opacity-0 transition-opacity group-hover:opacity-100">
                  {stat.description}
                </div>

                {/* Terminal Command Preview */}
                <div className="mt-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="rounded border border-gray-800 bg-black/50 p-2">
                    <code className="text-xs text-gray-400">$ {stat.command}</code>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="mx-auto max-w-3xl">
            <h3 className="mb-4 text-2xl font-bold text-white">Join the Largest FiveM Community</h3>
            <p className="mb-8 text-gray-400">
              Become part of a thriving ecosystem of developers, server owners, and players who
              choose QBCore for their roleplay experiences.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="btn-primary">Start Building Today</button>
              <button className="btn-secondary">View Success Stories</button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsGrid
