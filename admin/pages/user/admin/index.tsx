import { BaseContainer } from '@/components/layouts/BaseContainer'
import { NextPage } from 'next'
import { useState } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { AdminUserListItem } from '@/components/molecules/list_items/AdminUserListItem'
import { getAdminUserList } from '@/infra/api/admin_user'
import { getAuthUser, resendEmail } from '@/infra/api/auth'
import { User } from '@/lib/types/model/User'
import { DangerBunner } from '@/components/atoms/bunner/DangerBunner'
import { SuccessBunner } from '@/components/atoms/bunner/SuccessBunner'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import useSWR from 'swr'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Head from 'next/head'


const useSuccess = <T,>(initialState: T) => {
    const [success, setSuccess] = useState<T>(initialState)

    const newSetSuceess = (state: T, timeout?: number) => {
        setSuccess(state)

        setTimeout(() => {
            setSuccess(initialState)
        }, timeout)
    }
    
    return {
        success,
        setSuccess: newSetSuceess
    }
}

const IndexPage: NextPage = () => {
    const { data: users } = useSWR('/admin/api/admin-user', getAdminUserList)
    const [error, setError] = useState<string>('')
    const { success, setSuccess } = useSuccess<string>('')
    const { isMd } = useMediaQuery()
    const { data: authUser } = useSWR(
        '/admin/api/user',
        getAuthUser
    )

    const onResendEmail = async (email: string) => {
        try {
            await resendEmail(email)
            setSuccess('認証用のメールを送信しました。確認してください。', 3000)
        } catch (e) {
            setError('エラーが発生しました。')
        }
    }

    return (
        <div>
            <Head>
                <title>管理者アカウント管理画面</title>
            </Head>

            {isMd ? (
                <BaseHeader />
            ) : ''}

            <BaseContainer>
                <BaseWrapper
                    title="管理者アカウント管理画面"
                    actionHref="/user/admin/create"
                    actionText="管理者アカウント作成"
                >
                    {
                        success ? (
                            <SuccessBunner text={success} />
                        ) : ''
                    }

                    {
                        error ? (
                            <DangerBunner text={error} />
                        ) : ''
                    }

                    <div className="border-2 border-gray-800 p-2">
                        {users? (
                            users.map((user: User) => {
                                return <AdminUserListItem
                                    key={`user-${user.id}`} 
                                    authUser={authUser}
                                    user={user}
                                    onResendEmail={onResendEmail}
                                />
                            })
                        ) : ''}
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default IndexPage