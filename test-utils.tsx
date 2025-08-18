import { render, RenderOptions } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'

// Custom render function that includes any providers
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  const AllTheProviders = ({ children }: { children: ReactNode }) => {
    // Add any global providers here (ThemeProvider, etc.)
    return <>{children}</>
  }

  return render(ui, { wrapper: AllTheProviders, ...options })
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }

// Mock data factories
export const mockHeroData = {
  title: 'Build Amazing Roleplay Servers with QBCore',
  subtitle: 'The most popular and feature-rich FiveM framework',
  stats: [
    { number: '5,000+', label: 'Active Servers' },
    { number: '50,000+', label: 'Downloads' },
    { number: '100+', label: 'Resources' },
  ],
}

export const mockFeatures = [
  { icon: 'Users', text: 'Player Management' },
  { icon: 'Code', text: 'Modular Design' },
  { icon: 'Zap', text: 'High Performance' },
]
