#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const BASE_URL = 'https://qbcore.net'

/**
 * Validate SEO implementation after build
 */
async function validateSEO() {
  console.log('🔍 Validating SEO implementation...\n')
  
  let errors = 0
  let warnings = 0
  
  // Check if lib/seo.ts exists
  const seoLibPath = path.join(process.cwd(), 'lib', 'seo.ts')
  if (fs.existsSync(seoLibPath)) {
    console.log('✅ SEO utility library found')
  } else {
    console.log('❌ SEO utility library not found at lib/seo.ts')
    errors++
  }
  
  // Check if sitemap exists
  const sitemapPath = path.join(process.cwd(), 'pages', 'sitemap.xml.ts')
  if (fs.existsSync(sitemapPath)) {
    console.log('✅ Dynamic sitemap implementation found')
  } else {
    console.log('❌ Sitemap implementation not found at pages/sitemap.xml.ts')
    errors++
  }
  
  // Check if robots.txt exists
  const robotsPath = path.join(process.cwd(), 'pages', 'robots.txt.ts')
  if (fs.existsSync(robotsPath)) {
    console.log('✅ Dynamic robots.txt implementation found')
  } else {
    console.log('❌ Robots.txt implementation not found at pages/robots.txt.ts')
    errors++
  }
  
  // Check theme.config.tsx for SEO enhancements
  const themeConfigPath = path.join(process.cwd(), 'theme.config.tsx')
  if (fs.existsSync(themeConfigPath)) {
    const themeConfig = fs.readFileSync(themeConfigPath, 'utf-8')
    
    if (themeConfig.includes('useNextSeoProps') && themeConfig.includes('openGraph')) {
      console.log('✅ Enhanced SEO configuration found in theme.config.tsx')
    } else {
      console.log('⚠️ Theme configuration may be missing SEO enhancements')
      warnings++
    }
    
    if (themeConfig.includes('application/ld+json')) {
      console.log('✅ Structured data (JSON-LD) implementation found')
    } else {
      console.log('⚠️ Structured data implementation not found')
      warnings++
    }
  } else {
    console.log('❌ Theme configuration not found')
    errors++
  }
  
  // Check next.config.mjs for SEO headers
  const nextConfigPath = path.join(process.cwd(), 'next.config.mjs')
  if (fs.existsSync(nextConfigPath)) {
    const nextConfig = fs.readFileSync(nextConfigPath, 'utf-8')
    
    if (nextConfig.includes('headers()') && nextConfig.includes('sitemap.xml')) {
      console.log('✅ SEO headers configuration found in next.config.mjs')
    } else {
      console.log('⚠️ SEO headers may be missing from next.config.mjs')
      warnings++
    }
  } else {
    console.log('❌ Next.js configuration not found')
    errors++
  }
  
  // Check for essential SEO pages
  const essentialPages = ['pages/index.tsx', 'pages/docs/index.mdx']
  essentialPages.forEach(pagePath => {
    if (fs.existsSync(path.join(process.cwd(), pagePath))) {
      console.log(`✅ Essential page found: ${pagePath}`)
    } else {
      console.log(`⚠️ Essential page not found: ${pagePath}`)
      warnings++
    }
  })
  
  // Summary
  console.log('\n📊 SEO Validation Summary:')
  console.log(`✅ Passed: ${6 - errors - warnings}/6 checks`)
  if (warnings > 0) {
    console.log(`⚠️ Warnings: ${warnings}`)
  }
  if (errors > 0) {
    console.log(`❌ Errors: ${errors}`)
  }
  
  if (errors === 0 && warnings === 0) {
    console.log('\n🎉 All SEO validations passed! Your site is optimized for search engines.')
  } else if (errors === 0) {
    console.log('\n✨ SEO implementation is good with minor warnings. Consider addressing them for optimal performance.')
  } else {
    console.log('\n⚠️ Some SEO implementation issues found. Please address the errors above.')
    process.exit(1)
  }
  
  // Additional recommendations
  console.log('\n💡 SEO Recommendations:')
  console.log('• Test your sitemap: https://qbcore.net/sitemap.xml')
  console.log('• Test your robots.txt: https://qbcore.net/robots.txt')
  console.log('• Use Google Search Console to monitor your site\'s performance')
  console.log('• Submit your sitemap to Google Search Console')
  console.log('• Use PageSpeed Insights to check page loading performance')
  console.log('• Test structured data with Google\'s Rich Results Test')
}

// Run validation
validateSEO().catch(console.error)