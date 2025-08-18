import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  // Enable search indexing for better SEO
  search: {
    codeblocks: true
  },
  // MDX options for better SEO
  mdxOptions: {
    rehypePlugins: [
      // Add any rehype plugins for SEO here
    ]
  }
})

const config = {
  reactStrictMode: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'mdx'],
  
  // Performance optimizations
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  
  // SEO and Performance Headers
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      // Add any necessary redirects here
      {
        source: '/docs',
        destination: '/docs/installation',
        permanent: true,
      },
    ]
  },
  
  // Enable standalone output for Docker
  output: process.env.NODE_ENV === 'production' && !process.env.NEXT_EXPORT ? 'standalone' : undefined,
  
  // Webpack configuration for better performance
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    
    return config
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
}

// Add static export configuration for production build
if (process.env.NODE_ENV === 'production' && process.env.NEXT_EXPORT === 'true') {
  config.output = 'export'
  config.trailingSlash = true
  config.images = {
    unoptimized: true
  }
}

export default withNextra(config)
