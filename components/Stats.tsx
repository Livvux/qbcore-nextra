'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Download, Star, GitFork, Code } from 'lucide-react'
import { useEffect, useState } from 'react'

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false)

  const stats = [
    {
      icon: Users,
      number: 5000,
      suffix: '+',
      label: 'Active Servers',
      description: 'Servers running QBCore worldwide',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Download,
      number: 50000,
      suffix: '+',
      label: 'Downloads',
      description: 'Total framework downloads',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Code,
      number: 100,
      suffix: '+',
      label: 'Resources',
      description: 'Available scripts and add-ons',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Star,
      number: 2500,
      suffix: '+',
      label: 'GitHub Stars',
      description: 'Stars across all repositories',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: GitFork,
      number: 800,
      suffix: '+',
      label: 'Forks',
      description: 'Community contributions',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: TrendingUp,
      number: 400,
      suffix: '%',
      label: 'Growth',
      description: 'Usage increase last year',
      color: 'from-red-500 to-rose-500',
    },
  ]

  const CountUp = ({
    number,
    suffix,
    duration = 2000,
  }: {
    number: number
    suffix: string
    duration?: number
  }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!isVisible) return

      const startTime = Date.now()
      const endTime = startTime + duration
      const timer = setInterval(() => {
        const now = Date.now()
        const remaining = Math.max(endTime - now, 0)
        const rate = 1 - remaining / duration
        setCount(Math.floor(number * rate))

        if (remaining === 0) {
          clearInterval(timer)
          setCount(number)
        }
      }, 16)

      return () => clearInterval(timer)
    }, [number, duration]) // Removed isVisible as it's not needed in deps

    return (
      <span className="text-3xl font-bold md:text-4xl">
        {count.toLocaleString()}
        {suffix}
      </span>
    )
  }

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-24 dark:from-gray-900 dark:to-slate-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => setIsVisible(true)}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Trusted by the
            <span className="text-gradient block">FiveM Community</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Join thousands of developers and server owners who have made QBCore their framework of
            choice. Our numbers speak for themselves.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                ></div>

                {/* Icon */}
                <div
                  className={`relative h-16 w-16 rounded-xl bg-gradient-to-r ${stat.color} mx-auto mb-6 p-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </div>

                {/* Number */}
                <div className="mb-4 text-center">
                  <div className="text-gray-900 dark:text-white">
                    <CountUp number={stat.number} suffix={stat.suffix} />
                  </div>
                </div>

                {/* Label */}
                <h3 className="mb-2 text-center text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                  {stat.description}
                </p>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-blue-500/20"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Ready to Join the Community?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-gray-600 dark:text-gray-300">
              Whether you&apos;re building your first roleplay server or migrating from another
              framework, QBCore provides the tools and community support you need to succeed.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a href="/docs/installation/windows" className="btn-primary text-center">
                Start Building Today
              </a>
              <a href="/docs" className="btn-secondary text-center">
                Browse Documentation
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats
