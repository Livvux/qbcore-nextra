import { Html, Head, Main, NextScript } from 'next/document'
import { getWebsiteSchema, getSoftwareApplicationSchema } from '../lib/seo'

export default function Document() {
  const websiteSchema = getWebsiteSchema()
  const softwareSchema = getSoftwareApplicationSchema()

  return (
    <Html lang="en" dir="ltr">
      <Head>
        {/* Essential meta tags */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* DNS prefetch and preconnect for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//github.com" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and Icons - Updated with new icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme and browser UI */}
        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Security headers (additional to next.config.mjs) */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:;" />
        
        {/* Structured Data - Website and Software Application schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema),
          }}
        />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/og-image.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/logo.webp" as="image" type="image/webp" />
        
        {/* Alternative formats and feeds */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="QBCore Framework RSS Feed"
          href="/feed.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="QBCore Framework Atom Feed"
          href="/feed.xml"
        />
        
        {/* Search engine specific */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Geo and language */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="language" content="en" />
        
        {/* Mobile and accessibility */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="QBCore" />
        
        {/* Additional SEO enhancements */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="skype_toolbar" content="skype_toolbar_parser_compatible" />
        
        {/* Copyright and ownership */}
        <meta name="copyright" content="QBCore Framework Team" />
        <meta name="author" content="QBCore Framework Team" />
        <meta name="generator" content="Next.js, Nextra" />
      </Head>
      <body style={{ backgroundColor: 'rgba(17, 17, 17, var(--tw-bg-opacity))' }} className="text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}