'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface ToolCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  category: 'admin' | 'dev' | 'player' | 'maintenance'
  status?: 'new' | 'popular' | 'beta'
  isExternal?: boolean
}

const categoryStyles = {
  admin: {
    gradient: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500/20',
    hoverBorderColor: 'group-hover:border-blue-500/40',
    textColor: 'text-blue-400',
    bgGlow: 'bg-blue-500/10'
  },
  dev: {
    gradient: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/20',
    hoverBorderColor: 'group-hover:border-purple-500/40',
    textColor: 'text-purple-400',
    bgGlow: 'bg-purple-500/10'
  },
  player: {
    gradient: 'from-green-500 to-emerald-500',
    borderColor: 'border-green-500/20',
    hoverBorderColor: 'group-hover:border-green-500/40',
    textColor: 'text-green-400',
    bgGlow: 'bg-green-500/10'
  },
  maintenance: {
    gradient: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-500/20',
    hoverBorderColor: 'group-hover:border-orange-500/40',
    textColor: 'text-orange-400',
    bgGlow: 'bg-orange-500/10'
  }
}

const statusStyles = {
  new: {
    bg: 'bg-emerald-500',
    text: 'NEW'
  },
  popular: {
    bg: 'bg-yellow-500',
    text: 'POPULAR'
  },
  beta: {
    bg: 'bg-purple-500',
    text: 'BETA'
  }
}

export const ToolCard = ({ 
  title, 
  description, 
  href, 
  icon: Icon, 
  category, 
  status,
  isExternal = false 
}: ToolCardProps) => {
  const styles = categoryStyles[category]
  
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`group relative overflow-hidden rounded-xl border ${styles.borderColor} ${styles.hoverBorderColor} bg-black/50 backdrop-blur-md transition-all duration-300 hover:shadow-xl`}
    >
      {/* Gradient background on hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r ${styles.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
      />
      
      {/* Status badge */}
      {status && (
        <div className="absolute right-3 top-3 z-10">
          <div className={`${statusStyles[status].bg} rounded-full px-2 py-1 text-xs font-bold text-white`}>
            {statusStyles[status].text}
          </div>
        </div>
      )}
      
      <div className="relative p-6">
        {/* Icon container */}
        <div className="mb-4 flex items-center">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${styles.gradient} shadow-lg`}
          >
            <Icon className="h-6 w-6 text-white" />
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="space-y-3">
          <h3 className={`text-xl font-semibold text-white transition-colors duration-300 ${styles.textColor} group-hover:text-white`}>
            {title}
          </h3>
          <p className="text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Hover indicator */}
        <div className="mt-4 flex items-center text-sm font-medium text-gray-500 transition-colors duration-300 group-hover:text-gray-300">
          <span>Learn more</span>
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="ml-2"
          >
            →
          </motion.div>
        </div>
        
        {/* Glow effect on hover */}
        <div className={`absolute -inset-1 rounded-xl ${styles.bgGlow} opacity-0 blur transition-opacity duration-300 group-hover:opacity-20`} />
      </div>
    </motion.div>
  )

  if (isExternal) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        {cardContent}
      </a>
    )
  }

  return (
    <Link href={href} className="block">
      {cardContent}
    </Link>
  )
}