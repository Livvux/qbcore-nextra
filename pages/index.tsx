import React, { useEffect } from 'react'
import Head from 'next/head'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import TerminalShowcase from '../components/TerminalShowcase'
import GridFeatures from '../components/GridFeatures'
import StatsGrid from '../components/StatsGrid'
import CodeExample from '../components/CodeExample'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import GradientBlinds from '../components/GradientBlinds'

export default function HomePage() {
  useEffect(() => {
    // Add landing-page class when component mounts
    document.documentElement.classList.add('landing-page')

    // Remove landing-page class when component unmounts
    return () => {
      document.documentElement.classList.remove('landing-page')
    }
  }, [])

  return (
    <>
      <Head>
        <title>QBCore Framework - The #1 FiveM Framework</title>
        <meta
          name="description"
          content="Build amazing FiveM servers with QBCore Framework. Comprehensive documentation, resources, tutorials, and community support for FiveM server development."
        />
      </Head>

      <div className="landing-page relative min-h-screen bg-black text-white">
        <GradientBlinds
          className="absolute inset-0 -z-10"
          gradientColors={['#DB123E', '#FF4B6E']}
          angle={0}
          noise={0.3}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
        />
        {/* Navigation */}
        <Navigation />

        {/* Main content */}
        <main className="w-full">
          <Hero />
          <TerminalShowcase />
          <GridFeatures />
          <StatsGrid />
          <CodeExample />
          <Testimonials />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
