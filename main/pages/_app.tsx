import { AppProps } from 'next/app'
import Head from 'next/head'
import * as gtag from '@/lib/utils/Gtag'
import React, { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { Bugsnag } from '@/lib/utils/Bugsnag'

import 'swiper/swiper-bundle.min.css'
import '../styles/index.css'

const ErrorBoundary = process.env.BUGSNAG_API_KEY
  ? Bugsnag.getPlugin('react').createErrorBoundary(React)
  : ({ children }) => <div>{children}</div>

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
    if (!gtag.existsGaId) {
      return
    }

    const handleRouteChange = (path) => {
      gtag.pageview(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ErrorBoundary>
      <>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </>
    </ErrorBoundary>
  )
}

export default MyApp
