'use client'

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

const DefaultErrorFallback: React.FC<{ error?: Error; resetError: () => void }> = ({
  error,
  resetError,
}) => (
  <div className="flex min-h-[200px] items-center justify-center rounded-md border border-red-200 bg-red-50 p-6 text-center">
    <div>
      <h3 className="mb-2 text-lg font-semibold text-red-800">Something went wrong</h3>
      <p className="mb-4 text-sm text-red-600">
        {error?.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={resetError}
        className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  </div>
)

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // Could integrate with error monitoring service here
    } else {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent error={this.state.error} resetError={this.resetError} />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary