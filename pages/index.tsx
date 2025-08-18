import React from 'react'
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
      <style global jsx>{`
        /* Hide sidebar and toc for landing page only */
        .nextra-sidebar-container,
        .nextra-sidebar,
        aside,
        [role='complementary'],
        .nextra-toc {
          display: none !important;
        }

        /* Ensure full width layout for landing page */
        .nextra-container {
          max-width: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        /* Reset any Nextra layout styles */
        main {
          margin: 0 !important;
          padding: 0 !important;
          max-width: none !important;
        }

        /* Ensure body takes full width */
        body {
          --nextra-sidebar-width: 0px !important;
        }

        /* Customize landing page background */
        .nextra-content {
          padding: 0 !important;
        }
      `}</style>

      <div className="min-h-screen bg-black text-white">
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
