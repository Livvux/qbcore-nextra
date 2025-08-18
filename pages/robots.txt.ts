import { GetServerSideProps } from 'next'

function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Disallow admin and internal paths
Disallow: /api/
Disallow: /_next/
Disallow: /out/
Disallow: /node_modules/

# Allow specific bots to access all content
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Sitemap location
Sitemap: https://qbcore.net/sitemap.xml

# Crawl delay for polite crawling
Crawl-delay: 1`
}

function RobotsTxt() {
  // getServerSideProps will handle the response
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robotsTxt = generateRobotsTxt()

  res.setHeader('Content-Type', 'text/plain')
  // Cache for 24 hours
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.write(robotsTxt)
  res.end()

  return {
    props: {},
  }
}

export default RobotsTxt
