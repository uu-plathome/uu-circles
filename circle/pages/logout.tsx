import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { AuthContext } from '@/contexts/AuthContext'

const Logout: NextPage = () => {
  const authContext = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    const f = async () => {
      authContext.setAccessToken('')
      authContext.setUser(undefined)
      await router.push('/login')
    }

    f()
  }, [authContext.accessToken])

  return <div>logout...</div>
}

export default Logout
