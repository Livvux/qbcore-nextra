'use client'

import { motion } from 'framer-motion'
import { Copy, Check, Terminal, Play } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const CodeExample = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const codeExamples = [
    {
      title: 'Quick Installation',
      description: 'Get QBCore running on your server in seconds',
      language: 'bash',
      code: `# Clone the QBCore framework
git clone https://github.com/qbcore-framework/qb-core.git [qb-core]

# Start the core resource in your server.cfg
start qb-core

# Your server is now powered by QBCore!`,
      icon: Terminal,
    },
    {
      title: 'Create a Simple Job',
      description: 'Define custom jobs with unique mechanics',
      language: 'lua',
      code: `-- Add this to your qb-core/shared/jobs.lua
['police'] = {
    label = 'Police Department',
    defaultDuty = false,
    offDutyPay = false,
    grades = {
        ['0'] = { name = 'Cadet', payment = 75 },
        ['1'] = { name = 'Officer', payment = 100 },
        ['2'] = { name = 'Sergeant', payment = 125 },
        ['3'] = { name = 'Lieutenant', payment = 150 },
        ['4'] = { name = 'Chief', payment = 200, isboss = true }
    }
}`,
      icon: Play,
    },
    {
      title: 'Player Management',
      description: 'Handle player data with powerful APIs',
      language: 'lua',
      code: `-- Get player data
local Player = QBCore.Functions.GetPlayer(source)

-- Add money to player
Player.Functions.AddMoney('cash', 1000, 'bonus-pay')

-- Set player job
Player.Functions.SetJob('police', 2)

-- Save player data
Player.Functions.Save()

-- Trigger client event
TriggerClientEvent('qb-core:notify', source, 'Welcome to the server!', 'success')`,
      icon: Play,
    },
  ]

  const handleCopy = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedIndex(index)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const getSyntaxHighlight = (code: string, language: string) => {
    // Simple syntax highlighting for demonstration
    if (language === 'bash') {
      return code
        .replace(/(#.*$)/gm, '<span class="text-green-400">$1</span>')
        .replace(/(git|start|clone)/g, '<span class="text-blue-400">$1</span>')
    }

    if (language === 'lua') {
      return code
        .replace(/(--.*$)/gm, '<span class="text-green-400">$1</span>')
        .replace(
          /(local|function|end|if|then|else|return)/g,
          '<span class="text-purple-400">$1</span>'
        )
        .replace(/('.*?'|".*?")/g, '<span class="text-yellow-400">$1</span>')
        .replace(/(\d+)/g, '<span class="text-orange-400">$1</span>')
    }

    return code
  }

  return (
    <section className="bg-gray-900 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Simple Yet Powerful
            <span className="text-gradient block">Code Examples</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            See how easy it is to get started with QBCore. From installation to advanced features,
            everything is designed to be developer-friendly.
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          {codeExamples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="mb-12 last:mb-0"
            >
              <div className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 shadow-2xl">
                {/* Header */}
                <div className="border-b border-gray-700 bg-gray-800 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 p-2">
                        <example.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{example.title}</h3>
                        <p className="text-sm text-gray-400">{example.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(example.code, index)}
                      className="flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-2 text-gray-300 transition-colors duration-200 hover:bg-gray-600 hover:text-white"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span className="text-sm">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span className="text-sm">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Code Block */}
                <div className="relative">
                  <pre className="overflow-x-auto bg-gray-900 p-6 font-mono text-sm leading-relaxed text-gray-100">
                    <code
                      dangerouslySetInnerHTML={{
                        __html: getSyntaxHighlight(example.code, example.language),
                      }}
                    />
                  </pre>

                  {/* Language Badge */}
                  <div className="absolute right-4 top-4">
                    <span className="rounded border border-blue-500/30 bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-300">
                      {example.language}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 backdrop-blur-sm">
            <h3 className="mb-4 text-2xl font-bold text-white">Ready to Start Coding?</h3>
            <p className="mx-auto mb-6 max-w-2xl text-gray-300">
              Dive into our comprehensive documentation and discover all the powerful features
              QBCore has to offer. From basic setup to advanced customization.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a href="/docs" className="btn-primary text-center">
                View Documentation
              </a>
              <a
                href="https://github.com/qbcore-framework"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-center"
              >
                Browse GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CodeExample
