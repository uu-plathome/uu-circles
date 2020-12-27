import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import '../styles/index.css'
import { useRouter } from 'next/router';
import { AuthContext } from '@/contexts/AuthContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [ accessToken, setAccessToken ] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!accessToken) {
      router.push('/auth/login')
    }
  })

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

export default MyApp
