import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { logout } from '@/infra/api/auth'

const Logout: NextPage = () => {
  const authContext = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    const f = async () => {
      await logout()

      authContext.setAccessToken('')

      await router.push('/auth/login')
    }

    f()
  }, [])

  return <div>logout...</div>
}

export default Logout
