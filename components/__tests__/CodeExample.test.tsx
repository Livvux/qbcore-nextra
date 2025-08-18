import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../test-utils'
import CodeExample from '../CodeExample'

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockImplementation(() => Promise.resolve()),
  },
})

describe('CodeExample Component', () => {
  it('renders the main heading', () => {
    render(<CodeExample />)

    expect(screen.getByText(/Simple Yet Powerful/)).toBeInTheDocument()
    expect(screen.getByText(/Code Examples/)).toBeInTheDocument()
  })

  it('displays the description', () => {
    render(<CodeExample />)

    expect(screen.getByText(/See how easy it is to get started with QBCore/)).toBeInTheDocument()
  })

  it('renders all code examples', () => {
    render(<CodeExample />)

    expect(screen.getByText('Quick Installation')).toBeInTheDocument()
    expect(screen.getByText('Create a Simple Job')).toBeInTheDocument()
    expect(screen.getByText('Player Management')).toBeInTheDocument()
  })

  it('displays code example descriptions', () => {
    render(<CodeExample />)

    expect(screen.getByText('Get QBCore running on your server in seconds')).toBeInTheDocument()
    expect(screen.getByText('Define custom jobs with unique mechanics')).toBeInTheDocument()
    expect(screen.getByText('Handle player data with powerful APIs')).toBeInTheDocument()
  })

  it('shows language badges', () => {
    render(<CodeExample />)

    expect(screen.getByText('bash')).toBeInTheDocument()
    expect(screen.getAllByText('lua')).toHaveLength(2)
  })

  it('displays code content', () => {
    render(<CodeExample />)

    // Check for parts of the code that should be visible
    expect(screen.getByText(/Clone the QBCore framework/)).toBeInTheDocument()
    expect(screen.getByText(/Police Department/)).toBeInTheDocument()
    expect(screen.getByText(/Get player data/)).toBeInTheDocument()
  })

  it('has copy buttons for each code block', () => {
    render(<CodeExample />)

    const copyButtons = screen.getAllByText('Copy')
    expect(copyButtons).toHaveLength(3)
  })

  it('handles copy functionality', async () => {
    render(<CodeExample />)

    const copyButtons = screen.getAllByRole('button')
    const firstCopyButton = copyButtons[0]

    fireEvent.click(firstCopyButton)

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalled()
  })

  it('shows copy confirmation message', async () => {
    render(<CodeExample />)

    const copyButtons = screen.getAllByRole('button')
    const firstCopyButton = copyButtons[0]

    fireEvent.click(firstCopyButton)

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalled()
  })

  it('renders CTA section', () => {
    render(<CodeExample />)

    expect(screen.getByText('Ready to Start Coding?')).toBeInTheDocument()
    expect(screen.getByText(/Dive into our comprehensive documentation/)).toBeInTheDocument()
  })

  it('has correct links in CTA section', () => {
    render(<CodeExample />)

    const docsLink = screen.getByRole('link', { name: /View Documentation/i })
    const githubLink = screen.getByRole('link', { name: /Browse GitHub/i })

    expect(docsLink).toHaveAttribute('href', '/docs')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/qbcore-framework')
    expect(githubLink).toHaveAttribute('target', '_blank')
  })

  it('has proper semantic structure', () => {
    render(<CodeExample />)

    const mainHeading = screen.getByRole('heading', { level: 2 })
    expect(mainHeading).toBeInTheDocument()

    const exampleHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(exampleHeadings).toHaveLength(4) // 3 code examples + 1 CTA section
  })
})
