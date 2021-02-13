import { BaseContainer } from '@/components/layouts/BaseContainer'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { CircleUserListItem } from '@/components/molecules/list_items/CircleUserListItem'
import { deleteCircleUser, getCircleUserList, resendEmailCircleUser } from '@/infra/api/circle_user'
import { useRouter } from 'next/router'
import { User } from '@/lib/types/model/User'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { SuccessBunner } from '@/components/atoms/bunner/SuccessBunner'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const IndexPage: NextPage = () => {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([])
    const [success, setSuccess] = useState<boolean>(false)
    const { id } = router.query
    const { isMd } = useMediaQuery()

    useEffect(() => {
        const f = async () => {
            const foundUsers = await getCircleUserList(Number(id))
            setUsers(foundUsers.users)
        }

        f()
    }, [])

    const onDeleteUser = async (circleUserId: number) => {
        await deleteCircleUser(Number(id), circleUserId)

        const foundUsers = await getCircleUserList(Number(id))
        setUsers(foundUsers.users)
    }

    const onResendEmail = async (email: string) => {
        await resendEmailCircleUser(email)
        setSuccess(true)

        setTimeout(() => {
            setSuccess(false)
        }, 3000)
    }

    return (
        <div>
            {isMd ? (
                <BaseHeader />
            ) : ''}

            <BaseContainer>
                <BaseWrapper
                    title="サークルユーザー管理"
                    actionHref="/circle/[id]/user/create"
                    actionAs={`/circle/${id}/user/create`}
                    actionText="アカウント新規作成"
                >
                    {
                        success ? (
                            <SuccessBunner text="Success" />
                        ) : ''
                    }

                    <div className="border-2 border-gray-800 p-2">
                        {users.map((user: User) => {
                            return <CircleUserListItem
                                circleId={Number(id)}
                                key={`user-${user.id}`} 
                                user={user}
                                onResendEmail={onResendEmail}
                                onDelete={onDeleteUser}
                            />
                        })}
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default IndexPage