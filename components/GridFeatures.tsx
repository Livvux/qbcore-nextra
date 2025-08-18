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
Player.Functions.SetJob("police", 1)`,
    },
    {
      icon: Database,
      title: 'Database Integration',
      description: 'MySQL integration with automatic player data saving and loading',
      code: `MySQL.insert('INSERT INTO player_vehicles 
(license, citizenid, vehicle, hash, mods) 
VALUES (?, ?, ?, ?, ?)', {
    license, citizenid, vehicle, hash, mods
})`,
    },
    {
      icon: Code,
      title: 'Event System',
      description: 'Robust client-server communication with built-in validation',
      code: `RegisterNetEvent('qb-example:client:notify')
AddEventHandler('qb-example:client:notify', function(msg)
    QBCore.Functions.Notify(msg, "success")
end)`,
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
end)`,
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
end)`,
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
}`,
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Built-in localization system supporting multiple languages',
      code: `local Lang = QBCore.Shared.Locale
Lang:t('info.received_paycheck', {
    value = ESX.Math.GroupDigits(salary)
})`,
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
})`,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="relative overflow-hidden bg-black py-24">
      {/* Background Elements */}
      <div className="grid-pattern absolute inset-0 opacity-10"></div>
      <div className="bg-mesh absolute inset-0 opacity-30"></div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">
            Everything You Need to Build <span className="text-gradient">Epic Servers</span> 🎯
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-400">
            QBCore comes packed with powerful features and tools that make server development
            faster, easier, and more enjoyable.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="feature-card group cursor-pointer"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-qbcore/10 border-qbcore/20 group-hover:bg-qbcore/20 rounded-lg border p-2 transition-colors">
                  <feature.icon className="text-qbcore h-5 w-5" />
                </div>
                <h3 className="group-hover:text-qbcore text-lg font-bold text-white transition-colors">
                  {feature.title}
                </h3>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-gray-400">{feature.description}</p>

              <div className="code-block text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <pre className="overflow-x-auto text-gray-300">
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
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-sm">
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
