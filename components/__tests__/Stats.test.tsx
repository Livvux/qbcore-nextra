import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '../../test-utils'
import Stats from '../Stats'

// Mock the intersection observer for motion components
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

describe('Stats Component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the main heading', () => {
    render(<Stats />)

    expect(screen.getByText(/Trusted by the/)).toBeInTheDocument()
    expect(screen.getByText(/FiveM Community/)).toBeInTheDocument()
  })

  it('displays the description', () => {
    render(<Stats />)

    expect(screen.getByText(/Join thousands of developers and server owners/)).toBeInTheDocument()
    expect(screen.getByText(/Our numbers speak for themselves/)).toBeInTheDocument()
  })

  it('renders all stat cards', () => {
    render(<Stats />)

    // Check for stat labels
    expect(screen.getByText('Active Servers')).toBeInTheDocument()
    expect(screen.getByText('Downloads')).toBeInTheDocument()
    expect(screen.getByText('Resources')).toBeInTheDocument()
    expect(screen.getByText('GitHub Stars')).toBeInTheDocument()
    expect(screen.getByText('Forks')).toBeInTheDocument()
    expect(screen.getByText('Growth')).toBeInTheDocument()
  })

  it('displays stat descriptions', () => {
    render(<Stats />)

    expect(screen.getByText('Servers running QBCore worldwide')).toBeInTheDocument()
    expect(screen.getByText('Total framework downloads')).toBeInTheDocument()
    expect(screen.getByText('Available scripts and add-ons')).toBeInTheDocument()
    expect(screen.getByText('Stars across all repositories')).toBeInTheDocument()
    expect(screen.getByText('Community contributions')).toBeInTheDocument()
    expect(screen.getByText('Usage increase last year')).toBeInTheDocument()
  })

  it('initially shows count at 0 before animation', () => {
    render(<Stats />)

    // Numbers should start at 0 before animation
    const numbers = screen.getAllByText('0+')
    expect(numbers.length).toBeGreaterThanOrEqual(1)
  })

  it('renders CTA section', () => {
    render(<Stats />)

    expect(screen.getByText('Ready to Join the Community?')).toBeInTheDocument()
    expect(
      screen.getByText(/Whether you're building your first roleplay server/)
    ).toBeInTheDocument()
  })

  it('has correct links in CTA section', () => {
    render(<Stats />)

    const startBuildingLink = screen.getByRole('link', { name: /Start Building Today/i })
    const docsLink = screen.getByRole('link', { name: /Browse Documentation/i })

    expect(startBuildingLink).toHaveAttribute('href', '/docs/installation/windows')
    expect(docsLink).toHaveAttribute('href', '/docs')
  })

  it('has proper semantic structure', () => {
    render(<Stats />)

    const mainHeading = screen.getByRole('heading', { level: 2 })
    expect(mainHeading).toBeInTheDocument()

    const statHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(statHeadings).toHaveLength(7) // 6 stats + 1 CTA section
  })

  it('renders all stat icons', () => {
    render(<Stats />)

    // Check for SVG elements instead of img role
    const svgElements = document.querySelectorAll('svg')
    expect(svgElements.length).toBeGreaterThanOrEqual(6) // At least 6 stat icons
  })

  it('displays stat grid layout', () => {
    render(<Stats />)

    // Test that we have the expected number of stat labels
    const statLabels = [
      'Active Servers',
      'Downloads',
      'Resources',
      'GitHub Stars',
      'Forks',
      'Growth',
    ]

    statLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('shows proper stat suffixes', () => {
    render(<Stats />)

    // Check for % suffix on Growth stat
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('renders with proper accessibility', () => {
    render(<Stats />)

    // Check that all headings are accessible
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThanOrEqual(7)

    // Check that links are accessible
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
  })
})
