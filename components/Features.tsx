'use client'

import { motion } from 'framer-motion'
import {
  Users,
  Package,
  Briefcase,
  Database,
  Shield,
  Zap,
  Code,
  Heart,
  GitBranch,
  Layers,
} from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Users,
      title: 'Advanced Player Management',
      description:
        'Comprehensive player data handling with character creation, progression tracking, and persistent data storage.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Briefcase,
      title: 'Dynamic Job System',
      description:
        'Create custom jobs with unique mechanics, progression systems, and salary structures for immersive roleplay.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Package,
      title: 'Modern Inventory System',
      description:
        'Item-based inventory with drag & drop functionality, crafting systems, and unlimited customization options.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Database,
      title: 'Complete Economy',
      description:
        'Built-in banking system, cryptocurrency support, business management, and complex economic mechanics.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Security First',
      description:
        'Anti-cheat protection, secure transactions, and robust permission systems to keep your server safe.',
      color: 'from-red-500 to-rose-500',
    },
    {
      icon: Zap,
      title: 'High Performance',
      description:
        'Optimized code base designed for minimal server impact and maximum player capacity.',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: Code,
      title: 'Developer Friendly',
      description:
        'Clean APIs, extensive documentation, and modular architecture for easy customization and extension.',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Layers,
      title: 'Modular Design',
      description:
        'Pick and choose components you need. Every system is designed to work independently or together.',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: GitBranch,
      title: 'Open Source',
      description:
        'Fully open source with an active community contributing improvements, fixes, and new features.',
      color: 'from-slate-500 to-gray-500',
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
    <section className="bg-white py-24 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
            Everything You Need to Build
            <span className="text-gradient block">Amazing Roleplay Servers</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            QBCore provides all the essential tools and systems needed to create immersive,
            feature-rich FiveM roleplay servers that players will love.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="group feature-card relative">
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
              ></div>

              {/* Icon Container */}
              <div
                className={`relative h-12 w-12 rounded-lg bg-gradient-to-r ${feature.color} mb-4 p-3 transition-transform duration-300 group-hover:scale-110`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 group-hover:border-blue-500/20"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20">
            <Heart className="mx-auto mb-4 h-8 w-8 text-red-500" />
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Loved by the Community
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-gray-600 dark:text-gray-300">
              Join thousands of server owners who have chosen QBCore to power their roleplay
              communities. From small communities to large-scale servers, QBCore scales with your
              vision.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="rounded-lg bg-white px-4 py-2 shadow-sm dark:bg-gray-800">
                <span className="text-2xl font-bold text-blue-600">5,000+</span>
                <span className="ml-2 text-gray-600 dark:text-gray-300">Active Servers</span>
              </div>
              <div className="rounded-lg bg-white px-4 py-2 shadow-sm dark:bg-gray-800">
                <span className="text-2xl font-bold text-green-600">50K+</span>
                <span className="ml-2 text-gray-600 dark:text-gray-300">Downloads</span>
              </div>
              <div className="rounded-lg bg-white px-4 py-2 shadow-sm dark:bg-gray-800">
                <span className="text-2xl font-bold text-purple-600">100+</span>
                <span className="ml-2 text-gray-600 dark:text-gray-300">Resources</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features
