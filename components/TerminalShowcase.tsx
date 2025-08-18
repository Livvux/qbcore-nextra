'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Play, Pause } from 'lucide-react'

const TerminalShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentLine, setCurrentLine] = useState(0)

  const codeLines = [
    '-- Initialize QBCore Framework',
    'local QBCore = exports["qb-core"]:GetCoreObject()',
    '',
    '-- Create a new player event',
    'RegisterServerEvent("qb-example:server:giveItem")',
    'AddEventHandler("qb-example:server:giveItem", function(item, amount)',
    '    local src = source',
    '    local Player = QBCore.Functions.GetPlayer(src)',
    '    ',
    '    if Player then',
    '        Player.Functions.AddItem(item, amount)',
    '        TriggerClientEvent("inventory:client:ItemBox", src, ',
    '            QBCore.Shared.Items[item], "add")',
    '        TriggerClientEvent("QBCore:Notify", src, ',
    '            "You received " .. amount .. "x " .. item, "success")',
    '    end',
    'end)',
    '',
    '-- Export for other resources',
    'exports("GivePlayerItem", function(playerId, item, amount)',
    '    TriggerEvent("qb-example:server:giveItem", item, amount)',
    'end)',
  ]

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= codeLines.length - 1) {
          return 0
        }
        return prev + 1
      })
    }, 150)

    return () => clearInterval(interval)
  }, [isPlaying, codeLines.length])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <section className="relative overflow-hidden bg-black py-24">
      {/* Background Grid */}
      <div className="grid-pattern absolute inset-0 opacity-20"></div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">
            See QBCore in <span className="text-gradient">Action</span> ⚡
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-400">
            Watch how easy it is to create powerful roleplay features with QBCore&apos;s intuitive
            API and modular architecture.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mx-auto max-w-6xl"
        >
          <div className="grid items-start gap-8 lg:grid-cols-2">
            {/* Terminal Window */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="flex items-center gap-2">
                  <div className="terminal-dot bg-red-500"></div>
                  <div className="terminal-dot bg-yellow-500"></div>
                  <div className="terminal-dot bg-green-500"></div>
                </div>
                <span className="text-sm text-gray-400">qb-example/server/main.lua</span>
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-1 rounded px-3 py-1 text-xs text-gray-400 transition-colors hover:text-white"
                  >
                    {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>
              <div className="terminal-content min-h-[400px]">
                <div className="space-y-1">
                  {codeLines.map((line, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <span className="w-6 select-none text-right text-xs text-gray-600">
                        {line ? index + 1 : ''}
                      </span>
                      <div
                        className={`flex-1 transition-all duration-300 ${
                          index <= currentLine
                            ? 'translate-x-0 transform opacity-100'
                            : 'translate-x-2 transform opacity-30'
                        }`}
                      >
                        {line.startsWith('--') ? (
                          <span className="text-gray-500">{line}</span>
                        ) : line.includes('local') ||
                          line.includes('function') ||
                          line.includes('end') ? (
                          <span className="text-blue-400">{line}</span>
                        ) : line.includes('RegisterServerEvent') ||
                          line.includes('AddEventHandler') ||
                          line.includes('TriggerEvent') ? (
                          <span className="text-green-400">{line}</span>
                        ) : line.includes('"') ? (
                          <span className="text-yellow-400">{line}</span>
                        ) : (
                          <span className="text-gray-300">{line}</span>
                        )}
                        {index === currentLine && isPlaying && (
                          <span className="bg-qbcore ml-1 inline-block h-5 w-2 animate-pulse"></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-6">
              <div className="feature-card">
                <div className="flex items-start gap-4">
                  <div className="bg-qbcore mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-white">Simple Event System</h3>
                    <p className="text-sm text-gray-400">
                      Create server and client events with just a few lines of code. QBCore handles
                      all the networking for you.
                    </p>
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <div className="flex items-start gap-4">
                  <div className="bg-qbcore mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-white">Player Management</h3>
                    <p className="text-sm text-gray-400">
                      Built-in player object with inventory, money, job management, and metadata
                      storage out of the box.
                    </p>
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <div className="flex items-start gap-4">
                  <div className="bg-qbcore mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-white">Modular Architecture</h3>
                    <p className="text-sm text-gray-400">
                      Export functions between resources seamlessly. Build complex systems with
                      reusable components.
                    </p>
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <div className="flex items-start gap-4">
                  <div className="bg-qbcore mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-white">Real-time Notifications</h3>
                    <p className="text-sm text-gray-400">
                      Integrated notification system with customizable styles and automatic item box
                      displays.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TerminalShowcase
