'use client'

import { motion } from 'framer-motion'
import { Users, Code, Zap, Shield, Database, Cpu, Globe, Settings } from 'lucide-react'

const GridFeatures = () => {
  const features = [
    {
      icon: Users,
      title: 'Player Management',
      description: 'Complete player system with jobs, gangs, permissions, and metadata',
      code: `local Player = QBCore.Functions.GetPlayer(src)
Player.Functions.AddMoney("cash", 1000)
Player.Functions.SetJob("police", 1)`
    },
    {
      icon: Database,
      title: 'Database Integration',
      description: 'MySQL integration with automatic player data saving and loading',
      code: `MySQL.insert('INSERT INTO player_vehicles 
(license, citizenid, vehicle, hash, mods) 
VALUES (?, ?, ?, ?, ?)', {
    license, citizenid, vehicle, hash, mods
})`
    },
    {
      icon: Code,
      title: 'Event System',
      description: 'Robust client-server communication with built-in validation',
      code: `RegisterNetEvent('qb-example:client:notify')
AddEventHandler('qb-example:client:notify', function(msg)
    QBCore.Functions.Notify(msg, "success")
end)`
    },
    {
      icon: Shield,
      title: 'Anti-Cheat Protection',
      description: 'Built-in protection against common exploits and cheating attempts',
      code: `-- Automatic validation
QBCore.Functions.TriggerCallback('qb-police:server:getCops', 
function(cops)
    if cops >= Config.MinCops then
        -- Action allowed
    end
end)`
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized for large servers with minimal resource usage',
      code: `-- Efficient player loops
CreateThread(function()
    while true do
        for playerId in pairs(QBCore.Functions.GetPlayers()) do
            -- Process players efficiently
        end
        Wait(30000) -- 30 second intervals
    end
end)`
    },
    {
      icon: Settings,
      title: 'Highly Configurable',
      description: 'Extensive configuration options for every aspect of your server',
      code: `Config = {}
Config.MaxPlayers = GetConvarInt('sv_maxclients', 48)
Config.DefaultMoney = {
    cash = 500,
    bank = 5000,
    crypto = 0
}`
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Built-in localization system supporting multiple languages',
      code: `local Lang = QBCore.Shared.Locale
Lang:t('info.received_paycheck', {
    value = ESX.Math.GroupDigits(salary)
})`
    },
    {
      icon: Cpu,
      title: 'Resource Management',
      description: 'Smart resource loading and dependency management system',
      code: `QBCore.Functions.AddItems({
    ['bandage'] = {
        name = 'bandage',
        label = 'Bandage',
        weight = 115,
        type = 'item',
        image = 'bandage.png',
        unique = false,
        useable = true,
        shouldClose = true,
        combinable = nil,
        description = 'A bandage works every time'
    }
})`
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="grid-pattern absolute inset-0 opacity-10"></div>
      <div className="bg-mesh absolute inset-0 opacity-30"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Everything You Need to Build{' '}
            <span className="text-gradient">Epic Servers</span> 🎯
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            QBCore comes packed with powerful features and tools that make server development 
            faster, easier, and more enjoyable.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="feature-card group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-qbcore/10 border border-qbcore/20 group-hover:bg-qbcore/20 transition-colors">
                  <feature.icon className="h-5 w-5 text-qbcore" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-qbcore transition-colors">
                  {feature.title}
                </h3>
              </div>
              
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {feature.description}
              </p>

              <div className="code-block text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <pre className="text-gray-300 overflow-x-auto">
                  <code>{feature.code}</code>
                </pre>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-8 py-4 backdrop-blur-sm">
            <span className="text-gray-400">Ready to get started?</span>
            <a href="/docs" className="btn-primary text-sm">
              View Documentation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default GridFeatures