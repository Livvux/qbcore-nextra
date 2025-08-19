'use client'

import { motion } from 'framer-motion'
import { 
  Server, 
  Code, 
  CheckCircle, 
  Bug, 
  User, 
  Car, 
  Calculator
} from 'lucide-react'
import { ToolCard } from './ToolCard'

interface ToolsGridProps {
  category: 'admin' | 'dev' | 'player' | 'maintenance'
  title: string
  description: string
}

const toolsData = {
  admin: [
    {
      title: "Server IP Finder",
      description: "Find the direct IP address of any FiveM server using its connect code",
      href: "/tools/server-ip-finder",
      icon: Server,
      status: 'popular' as const
    }
  ],
  dev: [
    {
      title: "Code Generator",
      description: "Generate QBCore resource boilerplate code and templates",
      href: "/tools/code-generator", 
      icon: Code,
      status: 'new' as const
    },
    {
      title: "Config Validator",
      description: "Validate QBCore configuration files for errors and optimization",
      href: "/tools/config-validator",
      icon: CheckCircle
    },
    {
      title: "Event Debugger",
      description: "Debug and monitor QBCore events in real-time",
      href: "/tools/event-debugger",
      icon: Bug
    }
  ],
  player: [
    {
      title: "Character Builder", 
      description: "Create and customize character data for testing and roleplay",
      href: "/tools/character-builder",
      icon: User
    },
    {
      title: "Vehicle Customizer",
      description: "Design and preview vehicle modifications and liveries", 
      href: "/tools/vehicle-customizer",
      icon: Car,
      status: 'beta' as const
    },
    {
      title: "Economy Calculator",
      description: "Calculate optimal economy settings and job payouts",
      href: "/tools/economy-calculator",
      icon: Calculator
    }
  ],
  maintenance: [
    // No tools currently available - all maintenance tools need to be implemented
  ]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0
  }
}

export const ToolsGrid = ({ category, title, description }: ToolsGridProps) => {
  const tools = toolsData[category] || []
  
  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          {title}
        </h2>
        <p className="text-lg text-gray-400 max-w-3xl">
          {description}
        </p>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {tools.map((tool) => (
          <motion.div 
            key={tool.title} 
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ToolCard
              title={tool.title}
              description={tool.description}
              href={tool.href}
              icon={tool.icon}
              category={category}
              status={tool.status}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}