import { readdirSync, statSync } from 'fs'
import { join } from 'path'

const BASE_URL = 'https://qbcore.net'
const PAGES_DIR = join(process.cwd(), 'pages')

interface PageInfo {
  url: string
  lastModified: string
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

// Define priority levels for different page types
const PAGE_PRIORITIES = {
  homepage: 1.0,
  mainSections: 0.8,
  subPages: 0.6,
  resources: 0.7,
  tutorials: 0.6,
} as const

// Define change frequencies for different page types
const CHANGE_FREQUENCIES = {
  homepage: 'weekly' as const,
  documentation: 'monthly' as const,
  resources: 'monthly' as const,
  tutorials: 'monthly' as const,
  static: 'yearly' as const,
}

/**
 * Get priority based on page path
 */
function getPriority(path: string): number {
  if (path === '/') return PAGE_PRIORITIES.homepage
  if (path.startsWith('/docs') && path.split('/').length === 2) return PAGE_PRIORITIES.mainSections
  if (path.startsWith('/docs/resources')) return PAGE_PRIORITIES.resources
  if (path.startsWith('/docs/tutorials') || path.startsWith('/tutorials'))
    return PAGE_PRIORITIES.tutorials
  return PAGE_PRIORITIES.subPages
}

/**
 * Get change frequency based on page path
 */
function getChangeFrequency(path: string): PageInfo['changeFrequency'] {
  if (path === '/') return CHANGE_FREQUENCIES.homepage
  if (path.startsWith('/docs/resources') || path.startsWith('/docs/tutorials')) {
    return CHANGE_FREQUENCIES.resources
  }
  if (path.startsWith('/docs')) return CHANGE_FREQUENCIES.documentation
  return CHANGE_FREQUENCIES.static
}

/**
 * Check if a file should be included in sitemap
 */
function shouldInclude(filename: string): boolean {
  const excludePatterns = [
    '_app.tsx',
    '_document.tsx',
    '_error.tsx',
    '404.tsx',
    'sitemap.xml.ts',
    'robots.txt.ts',
    '_meta.ts',
  ]

  return (
    !excludePatterns.some((pattern) => filename.includes(pattern)) &&
    (filename.endsWith('.tsx') || filename.endsWith('.mdx'))
  )
}

/**
 * Convert file path to URL path
 */
function filePathToUrl(filePath: string): string {
  let url = filePath
    .replace(PAGES_DIR, '')
    .replace(/\.(tsx|mdx)$/, '')
    .replace(/\/index$/, '')

  if (url === '') url = '/'
  if (url !== '/' && !url.startsWith('/')) url = '/' + url

  return url
}

/**
 * Get last modified date for a file
 */
function getLastModified(filePath: string): string {
  try {
    const stats = statSync(filePath)
    return stats.mtime.toISOString().split('T')[0]
  } catch {
    return new Date().toISOString().split('T')[0]
  }
}

/**
 * Recursively scan directory for pages
 */
function scanDirectory(dir: string, pages: PageInfo[] = []): PageInfo[] {
  const items = readdirSync(dir)

  for (const item of items) {
    const itemPath = join(dir, item)
    const stats = statSync(itemPath)

    if (stats.isDirectory()) {
      // Recursively scan subdirectories
      scanDirectory(itemPath, pages)
    } else if (shouldInclude(item)) {
      const url = filePathToUrl(itemPath)
      const lastModified = getLastModified(itemPath)
      const priority = getPriority(url)
      const changeFrequency = getChangeFrequency(url)

      pages.push({
        url: `${BASE_URL}${url}`,
        lastModified,
        changeFrequency,
        priority,
      })
    }
  }

  return pages
}

/**
 * Get all pages for sitemap generation
 */
export async function getAllPages(): Promise<PageInfo[]> {
  const pages = scanDirectory(PAGES_DIR)

  // Sort by priority (highest first) then by URL
  return pages.sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority
    }
    return a.url.localeCompare(b.url)
  })
}

/**
 * Generate structured data for organization
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'QBCore Framework',
    description: 'The #1 FiveM Framework',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.webp`,
    sameAs: ['https://github.com/qbcore-framework'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      url: `${BASE_URL}/support`,
    },
  }
}

/**
 * Generate structured data for documentation
 */
export function getDocumentationSchema(title: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: description,
    url: url,
    publisher: {
      '@type': 'Organization',
      name: 'QBCore Framework',
      url: BASE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}

/**
 * Generate breadcrumb schema
 */
export function getBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}
