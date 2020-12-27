import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import '../styles/index.css'
import { useRouter } from 'next/router';
import { AuthContext } from '@/contexts/AuthContext';
import { axiosInstance } from '@/infra/api';
import { User } from '@/infra/api/types';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [ accessToken, setAccessToken ] = useState('')
  const router = useRouter()

  useEffect(() => {
    const f = async () => {
      if (!accessToken) {
        const localStorageAccessToken = localStorage.getItem('accessToken')
        if (localStorageAccessToken) {
          try {
            const { data } = await axiosInstance.get<User>('/user', {
              headers: {
                Authorization: `Bearer ${localStorageAccessToken}`,
              }
            })
            setAccessToken(data.apiToken)
          } catch(e) {
            localStorage.setItem('accessToken', '')
            await router.push('/auth/login')
          }
        } else {
          await router.push('/auth/login')
        }
      }
    }

    f()
  })

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

export default MyApp
