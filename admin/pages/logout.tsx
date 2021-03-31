import { AuthContext } from '@/contexts/AuthContext'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

const Logout: NextPage = () => {
  const authContext = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    const f = async () => {
      authContext.setAccessToken('')
      await router.push('/auth/login')
    }

    f()
  }, [authContext.accessToken])

  return <div>logout...</div>
}

export default Logout
