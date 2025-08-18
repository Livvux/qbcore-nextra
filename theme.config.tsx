import React from 'react'
import { useRouter } from 'next/router'
import Footer from './components/Footer'
import NavbarCTA from './components/NavbarCTA'
import { getOrganizationSchema, getBreadcrumbSchema } from './lib/seo'

const BASE_URL = 'https://qbcore.net'

const config = {
  logo: <img src="/logo.webp" alt="QBCore Framework" className="logo-header" />,
  project: {
    link: 'https://github.com/qbcore-framework',
  },
  docsRepositoryBase: 'https://github.com/Livvux/qbcore-nextra',
  editLink: {
    component: null,
  },
  footer: {
    component: <Footer />,
  },
  navbar: {
    extraContent: <NavbarCTA />,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    float: true,
  },
  navigation: true,
  darkMode: false,
  nextThemes: {
    forcedTheme: 'dark',
  },
  useNextSeoProps() {
    const { asPath, locale } = useRouter()

    // Default SEO props
    const defaultProps = {
      titleTemplate: '%s – QBCore Framework',
      defaultTitle: 'QBCore Framework - The #1 FiveM Framework',
      description:
        'QBCore is the most popular and comprehensive FiveM framework. Build amazing FiveM servers with our documentation, resources, and community support.',
      canonical: `${BASE_URL}${asPath}`,
      openGraph: {
        type: 'website',
        locale: locale || 'en_US',
        url: `${BASE_URL}${asPath}`,
        siteName: 'QBCore Framework',
        images: [
          {
            url: `${BASE_URL}/og-image.svg`,
            width: 1200,
            height: 630,
            alt: 'QBCore Framework - The #1 FiveM Framework',
          },
        ],
      },
      twitter: {
        handle: '@qbcoreframework',
        site: '@qbcoreframework',
        cardType: 'summary_large_image',
      },
    }

    // Homepage specific SEO
    if (asPath === '/') {
      return {
        ...defaultProps,
        title: 'QBCore Framework - The #1 FiveM Framework',
        description:
          'Build amazing FiveM servers with QBCore Framework. Comprehensive documentation, resources, tutorials, and community support for FiveM server development.',
      }
    }

    // Documentation pages
    if (asPath.startsWith('/docs')) {
      return {
        ...defaultProps,
        description:
          'QBCore Framework documentation. Learn how to build, configure, and customize your FiveM server with our comprehensive guides and API documentation.',
      }
    }

    // Tutorial pages
    if (asPath.startsWith('/tutorials')) {
      return {
        ...defaultProps,
        description:
          'Step-by-step tutorials for QBCore Framework. Learn FiveM server development, scripting, and best practices.',
      }
    }

    // Resources pages
    if (asPath.includes('/resources')) {
      return {
        ...defaultProps,
        description:
          'QBCore Framework resources and scripts. Discover pre-built components, jobs, and features for your FiveM server.',
      }
    }

    return defaultProps
  },
  head: () => {
    const { asPath, locale } = useRouter()
    const organizationSchema = getOrganizationSchema()

    return (
      <>
        {/* Essential Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content={locale || 'en'} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.webp" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Additional SEO Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="author" content="QBCore Framework Team" />
        <meta
          name="keywords"
          content="QBCore, FiveM, Framework, GTA5, Roleplay, Server, Development, Lua, JavaScript, Gaming"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:site_name" content="QBCore Framework" />
        <meta property="og:locale" content={locale || 'en_US'} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE_URL}/og-image.svg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="QBCore Framework - The #1 FiveM Framework" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@qbcoreframework" />
        <meta name="twitter:creator" content="@qbcoreframework" />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.svg`} />

        {/* Canonical URL */}
        <link rel="canonical" href={`${BASE_URL}${asPath}`} />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="QBCore Framework RSS Feed"
          href={`${BASE_URL}/feed.xml`}
        />

        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href={`${BASE_URL}/sitemap.xml`} />
      </>
    )
  },
}

export default config
