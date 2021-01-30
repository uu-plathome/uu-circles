
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseSidebar } from '@/components/layouts/BaseSidebar'
import { AuthContext } from '@/contexts/AuthContext'
import { User } from '@/infra/api/types'
import { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { CircleUserListItem } from '@/components/molecules/list_items/CircleUserListItem'
import { deleteCircleUser, getCircleUserList } from '@/infra/api/circle_user'
import { useRouter } from 'next/router'

const IndexPage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([])
    const { id } = router.query

    useEffect(() => {
        const f = async () => {
            const foundUsers = await getCircleUserList(Number(id), authContext.accessToken)
            setUsers(foundUsers.users)
        }

        if (authContext.accessToken && !!id) {
            f()
        }
    }, [ authContext.accessToken, id ])

    const onDeleteUser = async (circleUserId: number) => {
        await deleteCircleUser(Number(id), circleUserId, authContext.accessToken)

        const foundUsers = await getCircleUserList(Number(id), authContext.accessToken)
        setUsers(foundUsers.users)
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
                                サークルユーザー管理
                            </h1>

                            <GreenButton href="/circle/[id]/user/create" as={`/circle/${id}/user/create`}>
                                アカウント新規作成
                            </GreenButton>
                        </div>

                        <div className="border-2 border-gray-800 p-2">
                            {
                                users.map((user: User) => {
                                    return <CircleUserListItem
                                        key={`user-${user.id}`} 
                                        user={user}
                                        onDelete={onDeleteUser}
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