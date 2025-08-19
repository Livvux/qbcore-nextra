import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '../../test-utils'
import Testimonials from '../Testimonials'

// Mock the intersection observer for motion components
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

describe('Testimonials Component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the main heading', () => {
    render(<Testimonials />)

    expect(screen.getByText(/What the Community/)).toBeInTheDocument()
    expect(screen.getByText(/Says About QBCore/)).toBeInTheDocument()
  })

  it('displays the description', () => {
    render(<Testimonials />)

    expect(screen.getByText(/Don't just take our word for it/)).toBeInTheDocument()
    expect(screen.getByText(/Here's what server owners, developers/)).toBeInTheDocument()
  })

  it('renders testimonial cards', () => {
    render(<Testimonials />)

    // With marquee, all testimonials should be visible (may appear multiple times)
    expect(screen.getAllByText('Alex Rivera')).toHaveLength(4)
    expect(screen.getAllByText('Sarah Chen')).toHaveLength(4)
    expect(screen.getAllByText('Marcus Johnson')).toHaveLength(4)
    expect(screen.getAllByText('Emma Thompson')).toHaveLength(4)
    expect(screen.getAllByText('David Park')).toHaveLength(4)
    expect(screen.getAllByText('Lisa Rodriguez')).toHaveLength(4)
  })

  it('displays testimonial roles and servers', () => {
    render(<Testimonials />)

    expect(screen.getAllByText('Server Owner').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Lead Developer').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Community Manager').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Los Santos RP').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Liberty City Life').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Vice City Stories').length).toBeGreaterThan(0)
  })

  it('shows testimonial text content', () => {
    render(<Testimonials />)

    expect(screen.getAllByText(/QBCore transformed our server completely/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/As a developer, I love how clean/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/The stability and performance improvements/).length).toBeGreaterThan(0)
  })

  it('displays highlight badges', () => {
    render(<Testimonials />)

    expect(screen.getAllByText(/Player count doubled/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Clean and well-documented/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Zero server crashes/).length).toBeGreaterThan(0)
  })

  it('renders star ratings', () => {
    render(<Testimonials />)

    // Check for SVG star elements instead of img role
    const svgElements = document.querySelectorAll('svg.lucide-star')
    // Should have many stars (multiple testimonials × 5 stars × repeats × 2 rows)
    expect(svgElements.length).toBeGreaterThan(50)
  })

  it('displays marquee animation', () => {
    render(<Testimonials />)

    // Check that marquee containers exist
    const marqueeElements = document.querySelectorAll('[class*="animate-marquee"]')
    expect(marqueeElements.length).toBeGreaterThan(0)
  })

  it('renders CTA section', () => {
    render(<Testimonials />)

    expect(screen.getByText('Join These Success Stories')).toBeInTheDocument()
    expect(screen.getByText(/Ready to transform your FiveM server/)).toBeInTheDocument()
  })

  it('has correct links in CTA section', () => {
    render(<Testimonials />)

    const startStoryLink = screen.getByRole('link', { name: /Start Your Success Story/i })
    const communityLink = screen.getByRole('link', { name: /Join Community/i })

    expect(startStoryLink).toHaveAttribute('href', '/docs/installation/windows')
    expect(communityLink).toHaveAttribute('href', '/community')
  })

  it('has proper semantic structure', () => {
    render(<Testimonials />)

    const mainHeading = screen.getByRole('heading', { level: 2 })
    expect(mainHeading).toBeInTheDocument()

    const testimonialHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(testimonialHeadings).toHaveLength(1) // CTA section

    const nameHeadings = screen.getAllByRole('heading', { level: 4 })
    expect(nameHeadings.length).toBeGreaterThan(10) // Many testimonial name headings
  })

  it('displays testimonial avatars', () => {
    render(<Testimonials />)

    // Check for emoji avatars in the text content (should appear multiple times in marquee)
    const businessEmojis = screen.getAllByText('👨‍💼')
    const devEmojis = screen.getAllByText('👩‍💻')
    const gameEmojis = screen.getAllByText('👨‍🎮')
    
    expect(businessEmojis.length).toBeGreaterThan(0)
    expect(devEmojis.length).toBeGreaterThan(0)
    expect(gameEmojis.length).toBeGreaterThan(0)
  })

  it('displays testimonial text content correctly', () => {
    render(<Testimonials />)

    // Verify that testimonial text is properly displayed
    const testimonialTexts = screen.getAllByText(/QBCore transformed our server completely/i)
    expect(testimonialTexts.length).toBeGreaterThan(0)

    // Verify that testimonial includes the quoted formatting
    expect(testimonialTexts[0].textContent).toBeTruthy()
  })

  it('renders with marquee layout', () => {
    render(<Testimonials />)

    // All testimonials should be visible in marquee (appear multiple times)
    expect(screen.getAllByText('Alex Rivera')).toHaveLength(4)
    expect(screen.getAllByText('Sarah Chen')).toHaveLength(4)
    expect(screen.getAllByText('Marcus Johnson')).toHaveLength(4)
    expect(screen.getAllByText('Emma Thompson')).toHaveLength(4)
    expect(screen.getAllByText('David Park')).toHaveLength(4)
    expect(screen.getAllByText('Lisa Rodriguez')).toHaveLength(4)
  })
})
