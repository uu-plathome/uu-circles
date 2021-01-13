import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import '../styles/index.css'
import { useRouter } from 'next/router';
import { AuthContext } from '@/contexts/AuthContext';
import { axiosInstance } from '@/infra/api';
import { User } from '@/infra/api/types';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [ accessToken, setAccessToken ] = useState('')
  const [ loading, setLoading ] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const f = async () => {
      if (!accessToken && (!router.pathname.startsWith('/email/verify') && !router.pathname.startsWith('/auth'))) {
        if (typeof window !== "undefined") {
          const localStorageAccessToken = localStorage.getItem('accessToken')
          if (localStorageAccessToken) {
            try {
              const { data } = await axiosInstance.get<User>('/user', {
                headers: {
                  Authorization: `Bearer ${localStorageAccessToken}`,
                }
              })
              setAccessToken(data.apiToken)
              setLoading(false)
            } catch(e) {
              localStorage.setItem('accessToken', '')
              await router.push('/auth/login')
              setLoading(false)
            }
          } else {
            await router.push('/auth/login')
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
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {loading ?
        <div className="text-white">loading...</div> :
        <Component {...pageProps} />
      }
    </AuthContext.Provider>
  )
}

export default MyApp
