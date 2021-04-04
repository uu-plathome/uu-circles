import { AuthContext } from '@/contexts/AuthContext'
import { logout } from '@/infra/api/auth'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

const Logout: NextPage = () => {
  const authContext = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    const f = async () => {
      // ログアウト
      await logout()

      authContext.setAccessToken('')
      authContext.setUser(undefined)
      await router.push('/login')
    }

    f()
  }, [])

  return <div>logout...</div>
}

export default Logout
