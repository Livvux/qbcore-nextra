import { describe, it, expect } from 'vitest'
import { render, mockHeroData, mockFeatures } from '../test-utils'

describe('Test Utils', () => {
  it('exports custom render function', () => {
    expect(render).toBeDefined()
    expect(typeof render).toBe('function')
  })

  it('exports mockHeroData with correct structure', () => {
    expect(mockHeroData).toBeDefined()
    expect(mockHeroData.title).toBe('Build Amazing Roleplay Servers with QBCore')
    expect(mockHeroData.subtitle).toBe('The most popular and feature-rich FiveM framework')
    expect(Array.isArray(mockHeroData.stats)).toBe(true)
    expect(mockHeroData.stats).toHaveLength(3)
  })

  it('mockHeroData stats have correct structure', () => {
    mockHeroData.stats.forEach((stat) => {
      expect(stat).toHaveProperty('number')
      expect(stat).toHaveProperty('label')
      expect(typeof stat.number).toBe('string')
      expect(typeof stat.label).toBe('string')
    })
  })

  it('exports mockFeatures with correct structure', () => {
    expect(mockFeatures).toBeDefined()
    expect(Array.isArray(mockFeatures)).toBe(true)
    expect(mockFeatures).toHaveLength(3)
  })

  it('mockFeatures have correct properties', () => {
    mockFeatures.forEach((feature) => {
      expect(feature).toHaveProperty('icon')
      expect(feature).toHaveProperty('text')
      expect(typeof feature.icon).toBe('string')
      expect(typeof feature.text).toBe('string')
    })
  })

  it('mockFeatures contains expected feature texts', () => {
    const featureTexts = mockFeatures.map((f) => f.text)
    expect(featureTexts).toContain('Player Management')
    expect(featureTexts).toContain('Modular Design')
    expect(featureTexts).toContain('High Performance')
  })

  it('mockHeroData stats contain expected values', () => {
    const statLabels = mockHeroData.stats.map((s) => s.label)
    expect(statLabels).toContain('Active Servers')
    expect(statLabels).toContain('Downloads')
    expect(statLabels).toContain('Resources')

    const statNumbers = mockHeroData.stats.map((s) => s.number)
    expect(statNumbers).toContain('5,000+')
    expect(statNumbers).toContain('50,000+')
    expect(statNumbers).toContain('100+')
  })

  it('can render a simple component with custom render', () => {
    const TestComponent = () => <div>Test Component</div>
    const { container } = render(<TestComponent />)

    expect(container.textContent).toBe('Test Component')
  })

  it('custom render function works with providers', () => {
    // Test that the custom render function doesn't throw errors
    const TestComponent = () => (
      <div data-testid="test">
        <span>Provider Test</span>
      </div>
    )

    const { getByTestId } = render(<TestComponent />)
    expect(getByTestId('test')).toBeInTheDocument()
  })
})
