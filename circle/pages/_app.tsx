import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
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
              setLoading(false)
            } catch(e) {
              localStorage.setItem('accessToken', '')
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
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {loading ?
        <div className="text-white">loading...</div> :
        <Component {...pageProps} />
      }
    </AuthContext.Provider>
  )
}

export default MyApp
