'use client'

import { motion } from 'framer-motion'
import { Wrench, Zap, Users, Code2 } from 'lucide-react'

const stats = [
  { icon: Wrench, label: 'Tools Available', value: '15+' },
  { icon: Users, label: 'Active Users', value: '5K+' },
  { icon: Code2, label: 'Servers Powered', value: '2K+' },
  { icon: Zap, label: 'Uptime', value: '99.9%' }
]

export const ToolsHero = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      
      {/* Floating Elements */}
      <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-gradient-to-r from-green-500/10 to-cyan-500/10 blur-3xl" />
      
      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm"
          >
            <Wrench className="h-4 w-4 text-[#db123e]" />
            <span className="text-gray-300">Essential QBCore Tools & Utilities</span>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6 text-5xl font-bold text-white md:text-7xl lg:text-8xl"
          >
            <span className="text-gradient">Supercharge</span>
            <br />
            Your Server
          </motion.h1>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mb-12 max-w-3xl text-xl text-gray-400 md:text-2xl"
          >
            Professional tools designed for QBCore administrators, developers, and players.
            Everything you need to manage, develop, and enhance your FiveM server experience.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-16 flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <motion.a
              href="#tools"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Wrench className="h-5 w-5" />
              Explore Tools
            </motion.a>
            <motion.a
              href="/docs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Code2 className="h-5 w-5" />
              Documentation
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-[#db123e] to-[#ff4b6e] shadow-lg"
              >
                <stat.icon className="h-8 w-8 text-white" />
              </motion.div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-8 w-5 items-end justify-center rounded-full border-2 border-white/20 p-1"
        >
          <div className="h-3 w-1 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}