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
    'end)'
  ]

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentLine(prev => {
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
    transition: { duration: 0.6 }
  }

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Grid */}
      <div className="grid-pattern absolute inset-0 opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            See QBCore in{' '}
            <span className="text-gradient">Action</span> ⚡
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Watch how easy it is to create powerful roleplay features with QBCore&apos;s intuitive API and modular architecture.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Terminal Window */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="flex items-center gap-2">
                  <div className="terminal-dot bg-red-500"></div>
                  <div className="terminal-dot bg-yellow-500"></div>
                  <div className="terminal-dot bg-green-500"></div>
                </div>
                <span className="text-gray-400 text-sm">qb-example/server/main.lua</span>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-1 px-3 py-1 rounded text-xs text-gray-400 hover:text-white transition-colors"
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
                      <span className="text-gray-600 text-xs w-6 text-right select-none">
                        {line ? index + 1 : ''}
                      </span>
                      <div 
                        className={`flex-1 transition-all duration-300 ${
                          index <= currentLine 
                            ? 'opacity-100 transform translate-x-0' 
                            : 'opacity-30 transform translate-x-2'
                        }`}
                      >
                        {line.startsWith('--') ? (
                          <span className="text-gray-500">{line}</span>
                        ) : line.includes('local') || line.includes('function') || line.includes('end') ? (
                          <span className="text-blue-400">{line}</span>
                        ) : line.includes('RegisterServerEvent') || line.includes('AddEventHandler') || line.includes('TriggerEvent') ? (
                          <span className="text-green-400">{line}</span>
                        ) : line.includes('"') ? (
                          <span className="text-yellow-400">{line}</span>
                        ) : (
                          <span className="text-gray-300">{line}</span>
                        )}
                        {index === currentLine && isPlaying && (
                          <span className="inline-block w-2 h-5 bg-qbcore ml-1 animate-pulse"></span>
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
                  <div className="w-2 h-2 bg-qbcore rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Simple Event System</h3>
                    <p className="text-gray-400 text-sm">
                      Create server and client events with just a few lines of code. QBCore handles all the networking for you.
                    </p>
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-qbcore rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Player Management</h3>
                    <p className="text-gray-400 text-sm">
                      Built-in player object with inventory, money, job management, and metadata storage out of the box.
                    </p>
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-qbcore rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Modular Architecture</h3>
                    <p className="text-gray-400 text-sm">
                      Export functions between resources seamlessly. Build complex systems with reusable components.
                    </p>
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-qbcore rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Real-time Notifications</h3>
                    <p className="text-gray-400 text-sm">
                      Integrated notification system with customizable styles and automatic item box displays.
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