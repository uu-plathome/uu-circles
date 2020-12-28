
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseSidebar } from '@/components/layouts/BaseSidebar'
import { AuthContext } from '@/contexts/AuthContext'
import { User } from '@/infra/api/types'
import { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { AdminUserListItem } from '@/components/molecules/list_items/AdminUserListItem'
import { getAdminUserList } from '@/infra/api/admin_user'

const IndexPage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const f = async () => {
            const foundUsers = await getAdminUserList(authContext.accessToken)
            setUsers(foundUsers)
            console.log(foundUsers)
        }

        if (authContext.accessToken) {
            f()
        }
    }, [ authContext.accessToken ])

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

                        <div className="border-2 border-gray-800 p-2">
                            {
                                users.map((user: User) => {
                                    return <AdminUserListItem
                                        key={`user-${user.id}`} 
                                        user={user}
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