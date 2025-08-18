#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

/**
 * Generate basic favicon and icons from the existing logo
 * This is a simple SVG-based approach for favicon generation
 */

// Create a basic favicon SVG (simplified QB logo)
const faviconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0f172a"/>
  <rect x="6" y="6" width="8" height="8" fill="#3b82f6" rx="2"/>
  <rect x="18" y="6" width="8" height="8" fill="#60a5fa" rx="2"/>
  <rect x="6" y="18" width="8" height="8" fill="#60a5fa" rx="2"/>
  <rect x="18" y="18" width="8" height="8" fill="#3b82f6" rx="2"/>
  <text x="16" y="22" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="white">QB</text>
</svg>`

// Create Open Graph image SVG (1200x630)
const ogImageSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Logo Elements -->
  <g transform="translate(100, 150)">
    <rect x="0" y="0" width="80" height="80" fill="#3b82f6" rx="8"/>
    <rect x="100" y="0" width="80" height="80" fill="#60a5fa" rx="8"/>
    <rect x="0" y="100" width="80" height="80" fill="#60a5fa" rx="8"/>
    <rect x="100" y="100" width="80" height="80" fill="#3b82f6" rx="8"/>
  </g>
  
  <!-- Text -->
  <text x="350" y="250" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white">QBCore</text>
  <text x="350" y="300" font-family="Arial, sans-serif" font-size="48" fill="#94a3b8">Framework</text>
  <text x="350" y="380" font-family="Arial, sans-serif" font-size="32" fill="#64748b">The #1 FiveM Framework</text>
  <text x="350" y="430" font-family="Arial, sans-serif" font-size="24" fill="#64748b">Documentation &amp; Resources</text>
  
  <!-- Badge -->
  <rect x="950" y="50" width="200" height="40" fill="#3b82f6" rx="20"/>
  <text x="1050" y="75" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white">qbcore.net</text>
</svg>`

// Apple touch icon SVG (larger and cleaner)
const appleIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="180" height="180" fill="url(#bg2)" rx="40"/>
  
  <!-- Logo Elements -->
  <g transform="translate(35, 35)">
    <rect x="0" y="0" width="45" height="45" fill="#3b82f6" rx="8"/>
    <rect x="55" y="0" width="45" height="45" fill="#60a5fa" rx="8"/>
    <rect x="0" y="55" width="45" height="45" fill="#60a5fa" rx="8"/>
    <rect x="55" y="55" width="45" height="45" fill="#3b82f6" rx="8"/>
  </g>
  
  <text x="90" y="140" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white">QBCore</text>
</svg>`

async function generateIcons() {
  const publicDir = path.join(process.cwd(), 'public')
  
  console.log('🎨 Generating favicon and icon files...\n')
  
  try {
    // Save SVG files
    fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSVG)
    console.log('✅ Generated favicon.svg')
    
    fs.writeFileSync(path.join(publicDir, 'og-image.svg'), ogImageSVG)
    console.log('✅ Generated og-image.svg (Open Graph)')
    
    fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.svg'), appleIconSVG)
    console.log('✅ Generated apple-touch-icon.svg')
    
    // Create simple ICO content (basic approach)
    // For production, you'd want to use a proper icon generation library
    const basicIco = faviconSVG
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), basicIco)
    console.log('✅ Generated favicon.ico (SVG-based)')
    
    // Create PNG placeholders with SVG content
    // Note: For production, use Sharp or similar library to convert SVG to PNG
    fs.writeFileSync(path.join(publicDir, 'icon-192.svg'), appleIconSVG.replace('180', '192').replace('180', '192'))
    fs.writeFileSync(path.join(publicDir, 'icon-512.svg'), appleIconSVG.replace('180', '512').replace('180', '512'))
    console.log('✅ Generated icon-192.svg and icon-512.svg')
    
    console.log('\n🎉 Icon generation complete!')
    console.log('\n💡 Note: For production, consider using a tool like Sharp to convert SVGs to PNG/ICO formats')
    console.log('💡 Current implementation uses SVG files which work in modern browsers')
    
  } catch (error) {
    console.error('❌ Error generating icons:', error.message)
    process.exit(1)
  }
}

generateIcons()