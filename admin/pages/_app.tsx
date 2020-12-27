import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import '../styles/index.css'
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [ accessToken, setAccessToken ] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (router.pathname.startsWith('/auth') && accessToken !== '') {
      router.push('/')
    } else {
      router.push('/auth/login')
    }
  })

  return (<Component {...pageProps} accessToken={accessToken} setAccessToken={setAccessToken} />)
}

export default MyApp
