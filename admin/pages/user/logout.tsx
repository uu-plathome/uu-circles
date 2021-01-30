import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

const Logout: NextPage = () => {
    const authContext = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        const f = async () => {
            authContext.setAccessToken('')
            localStorage.setItem('accessToken', '')
    
            await router.push('/auth/login')
        }

        f()
    }, [ authContext.accessToken ])

    return (
        <div>
            logout...
        </div>
    )
}

export default Logout