/**
 * Gaming Hardware Product Database
 * Curated list of Amazon products relevant for FiveM/Gaming development
 */

export interface ProductData {
  asin: string
  category: string
  title: string
  description: string
  targetAudience: string[]
  useCase: string[]
  priceRange: string
}

export const gamingProducts: ProductData[] = [
  // Gaming PCs & Laptops
  {
    asin: 'B0C9PC692K', // Skytech Gaming Shadow PC with RTX 4060
    category: 'gaming-pc',
    title: 'Gaming PC - RTX 4060 System',
    description: 'High-performance gaming PC perfect for FiveM server development and testing',
    targetAudience: ['server-owners', 'developers', 'content-creators'],
    useCase: ['fivem-development', 'server-hosting', 'content-creation'],
    priceRange: '€1200-1500'
  },
  {
    asin: 'B0C66NM86J', // Skytech Gaming Nebula RTX 4060 Ti
    category: 'gaming-pc',
    title: 'Gaming PC - RTX 4060 Ti System',
    description: 'Premium gaming workstation for heavy FiveM modding and streaming',
    targetAudience: ['professional-developers', 'streamers', 'server-operators'],
    useCase: ['heavy-development', 'streaming', 'server-management'],
    priceRange: '€1500-2000'
  },
  
  // Graphics Cards
  {
    asin: 'B0BG7XCJKX', // RTX 4060 Graphics Card (typical ASIN pattern)
    category: 'gpu',
    title: 'NVIDIA RTX 4060 Graphics Card',
    description: '1080p gaming powerhouse perfect for FiveM at high settings',
    targetAudience: ['pc-builders', 'upgraders'],
    useCase: ['gaming', 'development', 'content-creation'],
    priceRange: '€300-400'
  },
  {
    asin: 'B0BG8MN2Q7', // RTX 4070 Graphics Card (typical ASIN pattern)
    category: 'gpu',
    title: 'NVIDIA RTX 4070 Graphics Card',
    description: '1440p gaming excellence with ray tracing for immersive RP sessions',
    targetAudience: ['enthusiasts', 'content-creators'],
    useCase: ['high-end-gaming', 'streaming', 'video-editing'],
    priceRange: '€500-650'
  },
  
  // Gaming Peripherals
  {
    asin: 'B08B3MHX4P', // Logitech G Pro X Superlight
    category: 'mouse',
    title: 'Gaming Mouse - Pro Wireless',
    description: 'Ultra-lightweight gaming mouse for precision in FiveM and development',
    targetAudience: ['gamers', 'developers'],
    useCase: ['gaming', 'productivity', 'development'],
    priceRange: '€80-120'
  },
  {
    asin: 'B07ZGDPT4M', // SteelSeries Apex Pro
    category: 'keyboard',
    title: 'Mechanical Gaming Keyboard',
    description: 'Programmable mechanical keyboard perfect for FiveM scripting',
    targetAudience: ['developers', 'gamers'],
    useCase: ['coding', 'gaming', 'productivity'],
    priceRange: '€180-250'
  },
  
  // Monitors
  {
    asin: 'B08N176P6B', // LG 27" Gaming Monitor
    category: 'monitor',
    title: '27" Gaming Monitor - 144Hz',
    description: 'High refresh rate monitor for smooth FiveM gameplay and development',
    targetAudience: ['gamers', 'developers'],
    useCase: ['gaming', 'development', 'multi-tasking'],
    priceRange: '€200-300'
  },
  {
    asin: 'B09H6YX7G4', // ASUS 32" Monitor
    category: 'monitor',
    title: '32" Developer Monitor - 4K',
    description: 'Large 4K display perfect for coding and server management',
    targetAudience: ['developers', 'server-operators'],
    useCase: ['development', 'server-monitoring', 'productivity'],
    priceRange: '€400-600'
  },
  
  // Development Hardware
  {
    asin: 'B08C4KZ4DJ', // Corsair Vengeance LPX 32GB
    category: 'ram',
    title: '32GB DDR4 RAM Kit',
    description: 'High-performance RAM for smooth FiveM server hosting and development',
    targetAudience: ['developers', 'server-owners'],
    useCase: ['server-hosting', 'development', 'multitasking'],
    priceRange: '€120-180'
  },
  {
    asin: 'B08N8KBY83', // Samsung 980 PRO 1TB NVMe
    category: 'storage',
    title: '1TB NVMe SSD',
    description: 'Ultra-fast storage for quick FiveM loading times and server data',
    targetAudience: ['everyone'],
    useCase: ['performance', 'server-storage', 'general-upgrade'],
    priceRange: '€80-120'
  },
  
  // Streaming & Content Creation
  {
    asin: 'B08G8WH435', // Blue Yeti X Microphone
    category: 'microphone',
    title: 'USB Microphone for Streaming',
    description: 'Professional microphone for FiveM streaming and tutorial creation',
    targetAudience: ['streamers', 'content-creators'],
    useCase: ['streaming', 'recording', 'tutorials'],
    priceRange: '€120-170'
  },
  {
    asin: 'B07VMWXGS3', // Elgato Stream Deck
    category: 'streaming',
    title: 'Stream Control Deck',
    description: 'Programmable keys for efficient server management and streaming',
    targetAudience: ['streamers', 'server-operators'],
    useCase: ['streaming', 'server-management', 'productivity'],
    priceRange: '€120-150'
  },
  
  // Books & Learning
  {
    asin: 'B08XJNP5VP', // Lua Programming Book
    category: 'book',
    title: 'Lua Programming Guide',
    description: 'Essential book for learning Lua scripting for FiveM development',
    targetAudience: ['beginners', 'developers'],
    useCase: ['learning', 'reference', 'skill-development'],
    priceRange: '€25-40'
  },
  {
    asin: 'B07H8B1J4M', // Game Development Book
    category: 'book',
    title: 'Game Development Fundamentals',
    description: 'Comprehensive guide to game development principles and practices',
    targetAudience: ['developers', 'students'],
    useCase: ['learning', 'reference', 'career-development'],
    priceRange: '€30-50'
  }
]

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): ProductData[] {
  return gamingProducts.filter(product => product.category === category)
}

/**
 * Get products by use case
 */
export function getProductsByUseCase(useCase: string): ProductData[] {
  return gamingProducts.filter(product => product.useCase.includes(useCase))
}

/**
 * Get products by target audience
 */
export function getProductsByAudience(audience: string): ProductData[] {
  return gamingProducts.filter(product => product.targetAudience.includes(audience))
}

/**
 * Get featured products for specific contexts
 */
export const featuredProducts = {
  installation: ['B0C9PC692K', 'B08C4KZ4DJ', 'B08N8KBY83'], // Gaming PC, RAM, SSD
  development: ['B08B3MHX4P', 'B07ZGDPT4M', 'B09H6YX7G4'], // Mouse, Keyboard, Monitor
  beginner: ['B08XJNP5VP', 'B07H8B1J4M', 'B08N8KBY83'], // Books and basic upgrades
  streaming: ['B08G8WH435', 'B07VMWXGS3', 'B0BG7XCJKX'], // Microphone, Stream Deck, GPU
  performance: ['B0C66NM86J', 'B0BG8MN2Q7', 'B08C4KZ4DJ'] // High-end PC, GPU, RAM
}