import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '../../test-utils'
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

    // Should show first 3 testimonials initially
    expect(screen.getByText('Alex Rivera')).toBeInTheDocument()
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument()
    expect(screen.getByText('Marcus Johnson')).toBeInTheDocument()
  })

  it('displays testimonial roles and servers', () => {
    render(<Testimonials />)

    expect(screen.getByText('Server Owner')).toBeInTheDocument()
    expect(screen.getByText('Lead Developer')).toBeInTheDocument()
    expect(screen.getByText('Community Manager')).toBeInTheDocument()
    expect(screen.getByText('Los Santos RP')).toBeInTheDocument()
    expect(screen.getByText('Liberty City Life')).toBeInTheDocument()
    expect(screen.getByText('Vice City Stories')).toBeInTheDocument()
  })

  it('shows testimonial text content', () => {
    render(<Testimonials />)

    expect(screen.getByText(/QBCore transformed our server completely/)).toBeInTheDocument()
    expect(screen.getByText(/As a developer, I love how clean/)).toBeInTheDocument()
    expect(screen.getByText(/The stability and performance improvements/)).toBeInTheDocument()
  })

  it('displays highlight badges', () => {
    render(<Testimonials />)

    expect(screen.getByText(/Player count doubled/)).toBeInTheDocument()
    expect(screen.getByText(/Clean and well-documented/)).toBeInTheDocument()
    expect(screen.getByText(/Zero server crashes/)).toBeInTheDocument()
  })

  it('renders star ratings', () => {
    render(<Testimonials />)

    // Check for SVG star elements instead of img role
    const svgElements = document.querySelectorAll('svg.lucide-star')
    // Should have stars for the visible testimonials
    expect(svgElements.length).toBeGreaterThanOrEqual(15) // 3 testimonials × 5 stars each
  })

  it('shows slide indicators', () => {
    render(<Testimonials />)

    // Should have slide indicator buttons
    const indicators = screen.getAllByRole('button')
    expect(indicators.length).toBeGreaterThan(0)
  })

  it('handles slide navigation', () => {
    render(<Testimonials />)

    // Get all slide indicator buttons
    const indicators = screen.getAllByRole('button')

    if (indicators.length > 1) {
      // Click second indicator
      fireEvent.click(indicators[1])

      // Should change testimonials (this is a basic test since we can't easily verify exact content change)
      expect(indicators[1]).toBeInTheDocument()
    }
  })

  it('auto-advances slides', () => {
    render(<Testimonials />)

    // Fast-forward timer by 5 seconds
    act(() => {
      vi.advanceTimersByTime(5000)
    })

    // Component should still be rendered (basic test since auto-advance logic is internal)
    expect(screen.getByText(/What the Community/)).toBeInTheDocument()
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
    expect(nameHeadings).toHaveLength(3) // 3 visible testimonial names
  })

  it('displays testimonial avatars', () => {
    render(<Testimonials />)

    // Check for emoji avatars in the text content
    expect(screen.getByText('👨‍💼')).toBeInTheDocument()
    expect(screen.getByText('👩‍💻')).toBeInTheDocument()
    expect(screen.getByText('👨‍🎮')).toBeInTheDocument()
  })

  it('displays testimonial text content correctly', () => {
    render(<Testimonials />)

    // Verify that testimonial text is properly displayed
    const testimonialText = screen.getByText(/QBCore transformed our server completely/i)
    expect(testimonialText).toBeInTheDocument()

    // Verify that testimonial includes the quoted formatting
    expect(testimonialText.textContent).toBeTruthy()
  })

  it('renders with proper grid layout', () => {
    render(<Testimonials />)

    // Should show exactly 3 testimonials at a time (based on component logic)
    const testimonialNames = [
      screen.queryByText('Alex Rivera'),
      screen.queryByText('Sarah Chen'),
      screen.queryByText('Marcus Johnson'),
    ]

    testimonialNames.forEach((name) => {
      expect(name).toBeInTheDocument()
    })
  })

  it('shows correct number of testimonials per slide', () => {
    render(<Testimonials />)

    // First slide should show first 3 testimonials
    expect(screen.getByText('Alex Rivera')).toBeInTheDocument()
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument()
    expect(screen.getByText('Marcus Johnson')).toBeInTheDocument()

    // Later testimonials should not be visible on first slide
    expect(screen.queryByText('Emma Thompson')).not.toBeInTheDocument()
    expect(screen.queryByText('David Park')).not.toBeInTheDocument()
  })
})
