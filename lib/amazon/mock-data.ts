/**
 * Mock data for development and fallback scenarios
 * Used when Amazon PA API is not available or in development
 */

import type { AmazonProduct, AmazonMarket } from '../types/amazon'
import { buildAffiliateUrl } from './link'

const mockProducts: Record<string, AmazonProduct> = {
  'B0C9PC692K': {
    asin: 'B0C9PC692K',
    title: 'Skytech Gaming Shadow Gaming PC Desktop – AMD Ryzen 7 5700X, NVIDIA RTX 4060, 1TB NVME SSD, 16GB DDR4 RAM',
    brand: 'Skytech Gaming',
    imageUrl: 'https://m.media-amazon.com/images/I/81J8YvK8tCL._AC_SL1500_.jpg',
    offer: {
      amount: 129999,
      currency: 'EUR', 
      display: '€1,299.99'
    },
    availability: 'In Stock',
    affiliateUrl: '',
    lastFetched: new Date().toISOString(),
    offerAgeMs: 0,
    market: 'DE'
  },
  'B0C66NM86J': {
    asin: 'B0C66NM86J',
    title: 'Skytech Gaming Nebula Gaming PC Desktop – AMD Ryzen 5 5600X, NVIDIA RTX 4060 Ti, 1TB NVME SSD, 16GB DDR4 RAM',
    brand: 'Skytech Gaming',
    imageUrl: 'https://m.media-amazon.com/images/I/81H8YvK8tCL._AC_SL1500_.jpg',
    offer: {
      amount: 159999,
      currency: 'EUR',
      display: '€1,599.99'
    },
    availability: 'In Stock',
    affiliateUrl: '',
    lastFetched: new Date().toISOString(),
    offerAgeMs: 0,
    market: 'DE'
  },
  'B0BG7XCJKX': {
    asin: 'B0BG7XCJKX',
    title: 'NVIDIA GeForce RTX 4060 Gaming Graphics Card',
    brand: 'NVIDIA',
    imageUrl: 'https://m.media-amazon.com/images/I/71K8YvK8tCL._AC_SL1500_.jpg',
    offer: {
      amount: 32999,
      currency: 'EUR',
      display: '€329.99'
    },
    availability: 'In Stock',
    affiliateUrl: '',
    lastFetched: new Date().toISOString(),
    offerAgeMs: 0,
    market: 'DE'
  },
  'B0BG8MN2Q7': {
    asin: 'B0BG8MN2Q7',
    title: 'NVIDIA GeForce RTX 4070 Gaming Graphics Card',
    brand: 'NVIDIA',
    imageUrl: 'https://m.media-amazon.com/images/I/71H8YvK8tCL._AC_SL1500_.jpg',
    offer: {
      amount: 57999,
      currency: 'EUR',
      display: '€579.99'
    },
    availability: 'In Stock',
    affiliateUrl: '',
    lastFetched: new Date().toISOString(),
    offerAgeMs: 0,
    market: 'DE'
  },
  'B08C4KZ4DJ': {
    asin: 'B08C4KZ4DJ',
    title: 'Corsair Vengeance LPX 32GB (2x16GB) DDR4 3200MHz C16 Memory Kit',
    brand: 'Corsair',
    imageUrl: 'https://m.media-amazon.com/images/I/61K8YvK8tCL._AC_SL1500_.jpg',
    offer: {
      amount: 12999,
      currency: 'EUR',
      display: '€129.99'
    },
    availability: 'In Stock',
    affiliateUrl: '',
    lastFetched: new Date().toISOString(),
    offerAgeMs: 0,
    market: 'DE'
  },
  'B08N8KBY83': {
    asin: 'B08N8KBY83',
    title: 'Samsung 980 PRO 1TB PCIe 4.0 NVMe M.2 SSD',
    brand: 'Samsung',
    imageUrl: 'https://m.media-amazon.com/images/I/71J8YvK8tCL._AC_SL1500_.jpg',
    offer: {
      amount: 9999,
      currency: 'EUR',
      display: '€99.99'
    },
    availability: 'In Stock',
    affiliateUrl: '',
    lastFetched: new Date().toISOString(),
    offerAgeMs: 0,
    market: 'DE'
  },
  'B08B3MHX4P': {
    asin: 'B08B3MHX4P',
    title: 'Logitech G Pro X Superlight Wireless Gaming Mouse',
    brand: 'Logitech G',
    imageUrl: 'https://m.media-amazon.com/images/I/61A8YvK8tCL._AC_SL1500_.jpg',
    offer: {
      amount: 11999,
      currency: 'EUR',
      display: '€119.99'
    },
    availability: 'In Stock',
    affiliateUrl: '',
    lastFetched: new Date().toISOString(),
    offerAgeMs: 0,
    market: 'DE'
  },
  'B07ZGDPT4M': {
    asin: 'B07ZGDPT4M',
    title: 'SteelSeries Apex Pro Mechanical Gaming Keyboard',
    brand: 'SteelSeries',
    imageUrl: 'https://m.media-amazon.com/images/I/71B8YvK8tCL._AC_SL1500_.jpg',
    offer: {
      amount: 19999,
      currency: 'EUR',
      display: '€199.99'
    },
    availability: 'In Stock',
    affiliateUrl: '',
    lastFetched: new Date().toISOString(),
    offerAgeMs: 0,
    market: 'DE'
  },
  'B09H6YX7G4': {
    asin: 'B09H6YX7G4',
    title: 'ASUS ProArt Display 32" 4K UHD Monitor for Developers',
    brand: 'ASUS',
    imageUrl: 'https://m.media-amazon.com/images/I/81C8YvK8tCL._AC_SL1500_.jpg',
    offer: {
      amount: 49999,
      currency: 'EUR',
      display: '€499.99'
    },
    availability: 'In Stock',
    affiliateUrl: '',
    lastFetched: new Date().toISOString(),
    offerAgeMs: 0,
    market: 'DE'
  },
  'B08N176P6B': {
    asin: 'B08N176P6B',
    title: 'LG 27GP850-B 27" Gaming Monitor 144Hz',
    brand: 'LG',
    imageUrl: 'https://m.media-amazon.com/images/I/71D8YvK8tCL._AC_SL1500_.jpg',
    offer: {
      amount: 29999,
      currency: 'EUR',
      display: '€299.99'
    },
    availability: 'In Stock',
    affiliateUrl: '',
    lastFetched: new Date().toISOString(),
    offerAgeMs: 0,
    market: 'DE'
  },
  'B08G8WH435': {
    asin: 'B08G8WH435',
    title: 'Blue Yeti X Professional USB Microphone',
    brand: 'Blue Microphones',
    imageUrl: 'https://m.media-amazon.com/images/I/61E8YvK8tCL._AC_SL1500_.jpg',
    offer: {
      amount: 16999,
      currency: 'EUR',
      display: '€169.99'
    },
    availability: 'In Stock',
    affiliateUrl: '',
    lastFetched: new Date().toISOString(),
    offerAgeMs: 0,
    market: 'DE'
  },
  'B07VMWXGS3': {
    asin: 'B07VMWXGS3',
    title: 'Elgato Stream Deck – Live Content Creation Controller',
    brand: 'Elgato',
    imageUrl: 'https://m.media-amazon.com/images/I/71F8YvK8tCL._AC_SL1500_.jpg',
    offer: {
      amount: 14999,
      currency: 'EUR',
      display: '€149.99'
    },
    availability: 'In Stock',
    affiliateUrl: '',
    lastFetched: new Date().toISOString(),
    offerAgeMs: 0,
    market: 'DE'
  },
  'B08XJNP5VP': {
    asin: 'B08XJNP5VP',
    title: 'Programming in Lua: The Complete Guide to Lua Scripting',
    brand: 'Lua.org',
    imageUrl: 'https://m.media-amazon.com/images/I/51G8YvK8tCL._AC_SL1500_.jpg',
    offer: {
      amount: 3499,
      currency: 'EUR',
      display: '€34.99'
    },
    availability: 'In Stock',
    affiliateUrl: '',
    lastFetched: new Date().toISOString(),
    offerAgeMs: 0,
    market: 'DE'
  },
  'B07H8B1J4M': {
    asin: 'B07H8B1J4M',
    title: 'Game Development Fundamentals: Design, Code, Test',
    brand: 'Game Dev Press',
    imageUrl: 'https://m.media-amazon.com/images/I/61H8YvK8tCL._AC_SL1500_.jpg',
    offer: {
      amount: 4499,
      currency: 'EUR',
      display: '€44.99'
    },
    availability: 'In Stock',
    affiliateUrl: '',
    lastFetched: new Date().toISOString(),
    offerAgeMs: 0,
    market: 'DE'
  },
  'B08N5WRWNW': {
    asin: 'B08N5WRWNW',
    title: 'Demo Gaming Hardware Product',
    brand: 'Demo Brand',
    imageUrl: 'https://m.media-amazon.com/images/I/71Demo8tCL._AC_SL1500_.jpg',
    offer: {
      amount: 29999,
      currency: 'EUR',
      display: '€299.99'
    },
    availability: 'In Stock',
    affiliateUrl: '',
    lastFetched: new Date().toISOString(),
    offerAgeMs: 0,
    market: 'DE'
  }
}

/**
 * Get mock product data for development and fallback
 */
export function getMockProduct(asin: string, market: AmazonMarket = 'DE'): AmazonProduct | null {
  const product = mockProducts[asin]
  
  if (!product) return null
  
  // Update market-specific data
  const updatedProduct = {
    ...product,
    market,
    affiliateUrl: buildAffiliateUrl(asin, market),
    lastFetched: new Date().toISOString(),
    offerAgeMs: 0
  }
  
  return updatedProduct
}

/**
 * Check if running in development mode
 */
export function isDevelopmentMode(): boolean {
  return process.env.NODE_ENV === 'development'
}

/**
 * Check if mock data should be used
 */
export function shouldUseMockData(): boolean {
  return isDevelopmentMode() || process.env.USE_AMAZON_MOCK_DATA === 'true'
}