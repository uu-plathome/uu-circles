import { LocalStorageKey } from '@/src/lib/enum/app/LocalStorageKey'
import {
  publishIdentification,
  validIdentification,
} from '@/src/lib/infra/api/identification'
import { Bugsnag } from '@/src/lib/utils/Bugsnag'
import * as gtag from '@/src/lib/utils/Gtag'
import { AppProps } from 'next/app'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React, { useEffect } from 'react'

import 'swiper/swiper-bundle.min.css'
import '@/src/styles/index.scss'

const ErrorBoundary = process.env.BUGSNAG_API_KEY
  ? Bugsnag.getPlugin('react').createErrorBoundary(React)
  : ({ children }) => <div>{children}</div>

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
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

  useEffect(() => {
    const f = async () => {
      // CSRであるかどうか
      if (typeof window !== 'undefined') {
        const localStorageIdentifierHash = localStorage.getItem(
          LocalStorageKey.identifierHash
        )

        if (localStorageIdentifierHash) {
          try {
            // 識別子が有効かどうかを確認する
            const status = await validIdentification({
              identifierHash: localStorageIdentifierHash,
            })

            // 識別子が有効なときは、処理終了
            if (status) {
              return
            }

            // 識別子が有効でないときは、識別子をlocalstorageから削除し、エラーログを出す。
            if (!status) {
              localStorage.setItem(LocalStorageKey.identifierHash, '')
              console.error('識別子が有効でありませんでした。', {
                localStorageIdentifierHash,
              })

              // 処理は継続し、識別子の再発行を行う
            }
          } catch (e) {
            console.error(e)
            return
          }
        }

        // 識別子が存在しない or 識別子が有効でないとき
        const { identifierHash } = await publishIdentification()

        localStorage.setItem(LocalStorageKey.identifierHash, identifierHash)
      }
    }
    f()
  }, [])

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
