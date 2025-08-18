import React from 'react'
import { useRouter } from 'next/router'
import Footer from './components/Footer'
import NavbarCTA from './components/NavbarCTA'

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
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – QBCore Framework'
      }
    }
  },
  head: () => {
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="QBCore Framework" />
        <meta property="og:description" content="The #1 FiveM Framework" />
      </>
    )
  },
}

export default config
