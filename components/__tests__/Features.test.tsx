import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import Features from '../Features'

describe('Features Component', () => {
  it('renders the main heading', () => {
    render(<Features />)

    expect(screen.getByText(/Everything You Need to Build/)).toBeInTheDocument()
    expect(screen.getByText(/Amazing Roleplay Servers/)).toBeInTheDocument()
  })

  it('displays the subtitle', () => {
    render(<Features />)

    expect(screen.getByText(/QBCore provides all the essential tools/)).toBeInTheDocument()
  })

  it('renders all feature cards', () => {
    render(<Features />)

    // Check for feature titles
    expect(screen.getByText('Advanced Player Management')).toBeInTheDocument()
    expect(screen.getByText('Dynamic Job System')).toBeInTheDocument()
    expect(screen.getByText('Modern Inventory System')).toBeInTheDocument()
    expect(screen.getByText('Complete Economy')).toBeInTheDocument()
    expect(screen.getByText('Security First')).toBeInTheDocument()
    expect(screen.getByText('High Performance')).toBeInTheDocument()
    expect(screen.getByText('Developer Friendly')).toBeInTheDocument()
    expect(screen.getByText('Modular Design')).toBeInTheDocument()
    expect(screen.getByText('Open Source')).toBeInTheDocument()
  })

  it('displays feature descriptions', () => {
    render(<Features />)

    expect(screen.getByText(/Comprehensive player data handling/)).toBeInTheDocument()
    expect(screen.getByText(/Create custom jobs with unique mechanics/)).toBeInTheDocument()
    expect(screen.getByText(/Item-based inventory with drag & drop/)).toBeInTheDocument()
  })

  it('shows community statistics', () => {
    render(<Features />)

    expect(screen.getByText('Loved by the Community')).toBeInTheDocument()
    expect(screen.getAllByText('5,000+')).toHaveLength(1)
    expect(screen.getAllByText('50K+')).toHaveLength(1)
    expect(screen.getAllByText('100+')).toHaveLength(1)
    expect(screen.getByText('Active Servers')).toBeInTheDocument()
    expect(screen.getByText('Downloads')).toBeInTheDocument()
    expect(screen.getByText('Resources')).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(<Features />)

    const mainHeading = screen.getByRole('heading', { level: 2 })
    expect(mainHeading).toBeInTheDocument()

    const featureHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(featureHeadings).toHaveLength(10) // 9 features + 1 community section
  })

  it('displays feature grid layout', () => {
    render(<Features />)

    // Test that we have the expected number of feature cards
    const featureCards = screen.getAllByText(
      /Management|System|Economy|Security|Performance|Developer|Modular|Open Source/
    )
    expect(featureCards.length).toBeGreaterThanOrEqual(9)
  })
})
