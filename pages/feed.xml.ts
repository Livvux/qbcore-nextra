import { GetServerSideProps } from 'next'
import { getAllPages } from '../lib/seo'

function generateRssFeed(pages: Array<{ url: string; lastModified: string }>) {
  const BASE_URL = 'https://qbcore.net'

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>QBCore Framework</title>
    <description>The #1 FiveM Framework - Documentation, tutorials, and resources</description>
    <link>${BASE_URL}</link>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/logo.webp</url>
      <title>QBCore Framework</title>
      <link>${BASE_URL}</link>
    </image>
${pages
  .filter((page) => page.url !== `${BASE_URL}/` && !page.url.includes('/_meta'))
  .slice(0, 50) // Latest 50 pages
  .map(({ url, lastModified }) => {
    const title = url.split('/').pop()?.replace(/-/g, ' ') || 'QBCore Documentation'
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1)

    return `    <item>
      <title>${capitalizedTitle}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>QBCore Framework documentation: ${capitalizedTitle}</description>
      <pubDate>${new Date(lastModified).toUTCString()}</pubDate>
      <category>Documentation</category>
    </item>`
  })
  .join('')}
  </channel>
</rss>`
}

function RSSFeed() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Get all pages from your MDX structure
  const pages = await getAllPages()

  // Generate the RSS feed
  const rss = generateRssFeed(pages)

  res.setHeader('Content-Type', 'application/rss+xml')
  // Cache the generated RSS feed for 1 hour
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate')
  res.write(rss)
  res.end()

  return {
    props: {},
  }
}

export default RSSFeed
