import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/index.css'
import { useRouter } from 'next/router';
import { AuthContext } from '@/contexts/AuthContext';
import { axiosInstance } from '@/infra/api';
import { User } from '@/lib/types/model/User';

const useAccessToken = (initialState: string) => {
  const [ accessToken, _setAccessToken ] = useState(initialState)
  const setAccessToken = (newAccessToken?: string) => {
    _setAccessToken(newAccessToken || '')

    axiosInstance.defaults.headers.common['Authorization'] = newAccessToken ?  `Bearer ${newAccessToken}` : ''
    localStorage.setItem('accessToken', newAccessToken || '')
  }

  return {
    accessToken,
    setAccessToken
  }
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { accessToken, setAccessToken } = useAccessToken('')
  const [ user, setUser ] = useState<User>(undefined)
  const [ loading, setLoading ] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const f = async () => {
      if (!accessToken && !router.pathname.startsWith('/auth')) {
        if (typeof window !== "undefined") {
          const localStorageAccessToken = localStorage.getItem('accessToken')
          if (localStorageAccessToken) {
            try {
              const { data } = await axiosInstance.get<User>('/circle/api/user', {
                headers: {
                  Authorization: `Bearer ${localStorageAccessToken}`,
                }
              })
              setAccessToken(data.apiToken)
              setUser(data)
              setLoading(false)
            } catch(e) {
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

    f()
  }, [])

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser }}>
      <>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
        </Head>

        {loading ?
          <div className="text-black">loading...</div> :
          <Component {...pageProps} />
        }
      </>
    </AuthContext.Provider>
  )
}

export default MyApp
