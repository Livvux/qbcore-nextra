import React from 'react'
import Head from 'next/head'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import TerminalShowcase from '../components/TerminalShowcase'
import GridFeatures from '../components/GridFeatures'
import StatsGrid from '../components/StatsGrid'
import CodeExample from '../components/CodeExample'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('landing-page')`,
          }}
        />
      </Head>

      <div className="landing-page min-h-screen bg-black text-white">
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
