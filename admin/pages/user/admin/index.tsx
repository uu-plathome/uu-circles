
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseSidebar } from '@/components/layouts/BaseSidebar'
import { AuthContext } from '@/contexts/AuthContext'
import { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { AdminUserListItem } from '@/components/molecules/list_items/AdminUserListItem'
import { deleteAdminUser, getAdminUserList } from '@/infra/api/admin_user'
import { resendEmail } from '@/infra/api/auth'
import { User } from '@/lib/types/model/User'
import { DangerBunner } from '@/components/atoms/bunner/DangerBunner'
import { SuccessBunner } from '@/components/atoms/bunner/SuccessBunner'


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
    const authContext = useContext(AuthContext)
    const [users, setUsers] = useState<User[]>([])
    const [error, setError] = useState<string>('')
    const { success, setSuccess } = useSuccess<string>('')

    useEffect(() => {
        const f = async () => {
            const foundUsers = await getAdminUserList(authContext.accessToken)
            setUsers(foundUsers)
        }

        if (authContext.accessToken) {
            f()
        }
    }, [ authContext.accessToken ])

    const onDeleteUser = async (userId: number) => {
        setError('')
        setSuccess('')
        const data = await deleteAdminUser(userId, authContext.accessToken)

        if (data && data.type === 'DeleteAdminUserValidationError') {
            setError(data.errors.data)
            return
        }

        if (data && data.type === 'success') {
            setSuccess('アカウントを削除できました。', 3000)
            const foundUsers = await getAdminUserList(authContext.accessToken)
            setUsers(foundUsers)
            return
        }
    }

    const onResendEmail = async (email: string) => {
        await resendEmail(email)
        setSuccess('認証用のメールを送信しました。確認してください。')
    }

    return (
        <div>
        <BaseHeader />

        <BaseContainer>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/5">
                    <BaseSidebar />
                </div>

                <div className="w-full lg:w-4/5">
                    <div className="py-10">
                        <div className="flex justify-between mb-8">
                            <h1 className="text-2xl text-gray-100">
                                管理者管理画面へようこそ
                            </h1>

                            <GreenButton href="/user/admin/create">
                                管理者新規作成
                            </GreenButton>
                        </div>

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
                            {
                                users.map((user: User) => {
                                    return <AdminUserListItem
                                        key={`user-${user.id}`} 
                                        user={user}
                                        onResendEmail={onResendEmail}
                                        onDeleteUser={onDeleteUser}
                                    />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            </BaseContainer>
        </div>
    )
}

export default IndexPage