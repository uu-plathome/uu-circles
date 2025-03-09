import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AuthContext } from '@/src/contexts/AuthContext'
import { axiosInstance } from '@/src/lib/infra/api'
import { User } from '@/src/lib/types/model/User'
import { Bugsnag } from '@/src/lib/utils/Bugsnag'

import 'react-datepicker/dist/react-datepicker.css'
import '@/src/styles/index.css'

const ErrorBoundary = process.env.BUGSNAG_API_KEY
  ? Bugsnag.getPlugin('react').createErrorBoundary(React)
  : ({ children }) => <div>{children}</div>

const useAccessToken = (initialState: string) => {
  const [accessToken, _setAccessToken] = useState(initialState)
  const setAccessToken = (newAccessToken?: string) => {
    _setAccessToken(newAccessToken || '')

    axiosInstance.defaults.headers.common['Authorization'] = newAccessToken
      ? `Bearer ${newAccessToken}`
      : ''
    localStorage.setItem('accessToken', newAccessToken || '')
  }

  return {
    accessToken,
    setAccessToken,
  }
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { accessToken, setAccessToken } = useAccessToken('')
  const [user, setUser] = useState<User>(undefined)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const f = async () => {
      if (!accessToken && !router.pathname.startsWith('/auth')) {
        if (typeof window !== 'undefined') {
          const localStorageAccessToken = localStorage.getItem('accessToken')
          if (localStorageAccessToken) {
            try {
              const { data } = await axiosInstance.get<User>(
                '/circle/api/user',
                {
                  headers: {
                    Authorization: `Bearer ${localStorageAccessToken}`,
                  },
                }
              )
              setAccessToken(data.apiToken)
              setUser(data)
              setLoading(false)
            } catch (e) {
              localStorage.setItem('accessToken', '')
              setAccessToken('')
              setUser(undefined)
              await router.push('/login')
              setLoading(false)
            }
          } else {
            await router.push('/login')
            setLoading(false)
          }
        }
      } else {
        setLoading(false)
      }
    }

    const f_maintenance = async () => {
      // メンテナンスモードであり、現在のページがメンテナンスページでない場合リダイレクト
      localStorage.setItem('accessToken', '')
      setAccessToken('')
      setUser(undefined)
      await router.push('/maintenance')
      setLoading(false)
    }

    // 環境変数からメンテナンスモードの状態を取得
    const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true'

    // メンテナンスモードであり、現在のページがメンテナンスページでない場合リダイレクト
    if (isMaintenance) {
      f_maintenance()
    } else {
      f()
    }
  }, [])

  return (
    <ErrorBoundary>
      <AuthContext.Provider
        value={{ accessToken, setAccessToken, user, setUser }}
      >
        <>
          <Head>
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1"
            />
          </Head>

          {loading ? (
            <div className="text-black">loading...</div>
          ) : (
            <Component {...pageProps} />
          )}
        </>
      </AuthContext.Provider>
    </ErrorBoundary>
  )
}

export default MyApp
