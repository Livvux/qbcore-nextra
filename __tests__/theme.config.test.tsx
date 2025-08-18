import { describe, it, expect } from 'vitest'
import config from '../theme.config'

describe('Theme Configuration', () => {
  it('exports a valid config object', () => {
    expect(config).toBeDefined()
    expect(typeof config).toBe('object')
  })

  it('has required configuration properties', () => {
    expect(config.logo).toBeDefined()
    expect(config.project).toBeDefined()
    expect(config.footer).toBeDefined()
    expect(config.docsRepositoryBase).toBeDefined()
  })

  it('has correct project link', () => {
    expect(config.project.link).toBe('https://github.com/qbcore-framework')
  })

  it('has correct docs repository base', () => {
    expect(config.docsRepositoryBase).toBe('https://github.com/Livvux/qbcore-nextra')
  })

  it('has logo as JSX element', () => {
    expect(config.logo).toBeDefined()
    // Logo is a JSX element, not a component
    expect(typeof config.logo).toBe('object')
  })

  it('has footer component as JSX element', () => {
    expect(config.footer.component).toBeDefined()
    // Footer component is a JSX element, not a component
    expect(typeof config.footer.component).toBe('object')
  })
})
