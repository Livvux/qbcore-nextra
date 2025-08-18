import { GetServerSideProps } from 'next'
import { getAllPages } from '../lib/seo'

function generateSiteMap(
  pages: Array<{ url: string; lastModified: string; changeFrequency: string; priority: number }>
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(({ url, lastModified, changeFrequency, priority }) => {
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`
  })
  .join('')}
</urlset>`
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Get all pages from your MDX structure
  const pages = await getAllPages()

  // Generate the XML sitemap
  const sitemap = generateSiteMap(pages)

  res.setHeader('Content-Type', 'text/xml')
  // Cache the generated sitemap for 24 hours
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
