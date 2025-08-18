import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import Hero from '../Hero'

describe('Hero Component', () => {
  it('renders the main headline', () => {
    render(<Hero />)

    expect(screen.getByText(/Build Amazing/)).toBeInTheDocument()
    expect(screen.getByText(/Roleplay Servers/)).toBeInTheDocument()
    expect(screen.getByText(/with QBCore/)).toBeInTheDocument()
  })

  it('displays the framework badge', () => {
    render(<Hero />)

    expect(screen.getByText('The #1 FiveM Framework')).toBeInTheDocument()
  })

  it('shows the subtitle with server count', () => {
    render(<Hero />)

    expect(screen.getByText(/most popular and feature-rich FiveM framework/)).toBeInTheDocument()
    expect(screen.getByText(/5,000\+ servers/)).toBeInTheDocument()
  })

  it('renders feature pills', () => {
    render(<Hero />)

    expect(screen.getByText('Player Management')).toBeInTheDocument()
    expect(screen.getByText('Modular Design')).toBeInTheDocument()
    expect(screen.getByText('High Performance')).toBeInTheDocument()
  })

  it('displays CTA buttons with correct links', () => {
    render(<Hero />)

    const getStartedLink = screen.getByRole('link', { name: /Get Started/i })
    const docsLink = screen.getByRole('link', { name: /Documentation/i })

    expect(getStartedLink).toHaveAttribute('href', '/docs/installation/windows')
    expect(docsLink).toHaveAttribute('href', '/docs')
  })

  it('shows statistics section', () => {
    render(<Hero />)

    expect(screen.getByText('5,000+')).toBeInTheDocument()
    expect(screen.getByText('Active Servers')).toBeInTheDocument()
    expect(screen.getByText('50,000+')).toBeInTheDocument()
    expect(screen.getByText('Downloads')).toBeInTheDocument()
    expect(screen.getByText('100+')).toBeInTheDocument()
    expect(screen.getByText('Resources')).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(<Hero />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
