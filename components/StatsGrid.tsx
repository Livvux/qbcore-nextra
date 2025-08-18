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
      description: 'Servers running QBCore worldwide'
    },
    {
      id: 'downloads',
      icon: Download,
      label: 'Total Downloads',
      value: '50,000+',
      command: 'qb-stats --downloads',
      description: 'Framework installations to date'
    },
    {
      id: 'players',
      icon: Users,
      label: 'Active Players',
      value: '100,000+',
      command: 'qb-stats --players',
      description: 'Players online across all servers'
    },
    {
      id: 'contributors',
      icon: GitFork,
      label: 'Contributors',
      value: '150+',
      command: 'qb-stats --contributors',
      description: 'Developers contributing to QBCore'
    },
    {
      id: 'stars',
      icon: Star,
      label: 'GitHub Stars',
      value: '2,500+',
      command: 'qb-stats --stars',
      description: 'Stars on GitHub repositories'
    },
    {
      id: 'resources',
      icon: Eye,
      label: 'Resources',
      value: '200+',
      command: 'qb-stats --resources',
      description: 'Available resources and plugins'
    }
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
      ''
    ]

    let currentIndex = 0
    let currentChar = 0
    let timeoutId: NodeJS.Timeout

    const typeWriter = () => {
      if (currentIndex < terminalCommands.length) {
        const currentCommand = terminalCommands[currentIndex]
        
        if (currentChar <= currentCommand.length) {
          setTypedText(terminalCommands.slice(0, currentIndex).join('\n') + 
                     (currentIndex > 0 ? '\n' : '') + 
                     currentCommand.substring(0, currentChar))
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
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="grid-pattern absolute inset-0 opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Terminal Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Trusted by the{' '}
              <span className="text-gradient">Community</span> 📊
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              See the real numbers behind QBCore&apos;s success. Our framework powers 
              thousands of servers and brings joy to hundreds of thousands of players.
            </p>

            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500"></div>
                <div className="terminal-dot bg-yellow-500"></div>
                <div className="terminal-dot bg-green-500"></div>
                <span className="text-gray-400 text-sm ml-4">qb-terminal</span>
              </div>
              <div className="terminal-content min-h-[300px]">
                <pre className="text-gray-300 whitespace-pre-wrap">
                  {typedText}
                  <span className="inline-block w-2 h-5 bg-qbcore ml-1 animate-pulse"></span>
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
                className="feature-card text-center group cursor-pointer"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-lg bg-qbcore/10 border border-qbcore/20 group-hover:bg-qbcore/20 transition-colors">
                    <stat.icon className="h-6 w-6 text-qbcore" />
                  </div>
                </div>
                
                <div className="mb-2 text-3xl font-black text-white font-mono group-hover:text-qbcore transition-colors">
                  {stat.value}
                </div>
                
                <div className="text-gray-400 text-sm font-medium mb-2">
                  {stat.label}
                </div>

                <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {stat.description}
                </div>

                {/* Terminal Command Preview */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/50 rounded border border-gray-800 p-2">
                    <code className="text-xs text-gray-400">
                      $ {stat.command}
                    </code>
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
          className="text-center mt-20"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join the Largest FiveM Community
            </h3>
            <p className="text-gray-400 mb-8">
              Become part of a thriving ecosystem of developers, server owners, and players 
              who choose QBCore for their roleplay experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Start Building Today
              </button>
              <button className="btn-secondary">
                View Success Stories
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsGrid