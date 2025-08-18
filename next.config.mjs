import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

const config = {
  reactStrictMode: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'mdx'],
  // Performance optimizations
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  // Enable standalone output for Docker
  output: process.env.NODE_ENV === 'production' && !process.env.NEXT_EXPORT ? 'standalone' : undefined,
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
