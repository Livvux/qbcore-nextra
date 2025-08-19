'use client'

import { motion } from 'framer-motion'
import { 
  Server, 
  Database, 
  Activity, 
  Code, 
  CheckCircle, 
  Bug, 
  User, 
  Car, 
  Calculator, 
  Shield, 
  HardDrive, 
  Zap,
  Users,
  FileText,
  Globe,
  BarChart3,
  Map,
  Gamepad2,
  Folder
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
    },
    {
      title: "Database Manager",
      description: "Manage your QBCore database with a user-friendly interface",
      href: "/tools/database-manager",
      icon: Database
    },
    {
      title: "Resource Monitor", 
      description: "Monitor server performance and resource usage in real-time",
      href: "/tools/resource-monitor",
      icon: Activity
    },
    {
      title: "Log Analyzer",
      description: "Parse and analyze server logs with advanced filtering and insights",
      href: "/tools/log-analyzer",
      icon: FileText
    },
    {
      title: "Player Manager",
      description: "Manage player accounts, data, and permissions efficiently",
      href: "/tools/player-manager",
      icon: Users
    },
    {
      title: "Resource Manager",
      description: "Install, update, and configure server resources seamlessly",
      href: "/tools/resource-manager",
      icon: Folder
    },
    {
      title: "Security Scanner",
      description: "Scan for vulnerabilities and security issues in your server",
      href: "/tools/security-scanner",
      icon: Shield,
      status: 'new' as const
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
    },
    {
      title: "Database Schema Tool",
      description: "Manage database schemas and migrations for QBCore",
      href: "/tools/database-schema-tool",
      icon: Database
    },
    {
      title: "API Tester",
      description: "Test server callbacks, exports, and API endpoints",
      href: "/tools/api-tester",
      icon: Globe
    },
    {
      title: "Performance Profiler",
      description: "Identify performance bottlenecks and optimization opportunities",
      href: "/tools/performance-profiler",
      icon: BarChart3
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
    },
    {
      title: "Map Tool",
      description: "Create and manage custom map locations and coordinates",
      href: "/tools/map-tool",
      icon: Map
    },
    {
      title: "Scenario Builder",
      description: "Design immersive roleplay scenarios and events",
      href: "/tools/scenario-builder",
      icon: Gamepad2
    },
    {
      title: "Statistics Dashboard",
      description: "View comprehensive server and player statistics",
      href: "/tools/statistics-dashboard",
      icon: BarChart3,
      status: 'popular' as const
    }
  ],
  maintenance: [
    {
      title: "Health Checker",
      description: "Automated server health monitoring and diagnostics",
      href: "/tools/health-checker",
      icon: Shield,
      status: 'new' as const
    },
    {
      title: "Cache Cleaner", 
      description: "Clear and optimize server caches for better performance",
      href: "/tools/cache-cleaner",
      icon: HardDrive
    },
    {
      title: "Startup Optimizer",
      description: "Optimize server startup sequence and resource loading",
      href: "/tools/startup-optimizer", 
      icon: Zap
    }
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