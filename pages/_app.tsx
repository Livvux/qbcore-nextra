import '../styles/globals.css'
import 'nextra-theme-docs/style.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Remove landing-page class when navigating away from homepage
    const handleRouteChange = (url: string) => {
      if (url !== '/') {
        document.documentElement.classList.remove('landing-page')
      }
    }

    // Listen for route changes
    router.events.on('routeChangeComplete', handleRouteChange)

    // Clean up event listener
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}
