import { NextPage } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CircleUserRelationListItem } from '@/components/molecules/list_items/CircleUserRelationListItem'
import { getCircleListByUserId } from '@/infra/api/circle'
import { Circle } from '@/lib/types/model/Circle'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { User } from '@/lib/types/model/User'
import { deleteRelationBetweenUserAndCircle } from '@/infra/api/circle_user'
import { useSuccess } from '@/hooks/useSuccess'
import { SuccessBunner } from '@/components/atoms/bunner/SuccessBunner'
import { DangerBunner } from '@/components/atoms/bunner/DangerBunner'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const IndexPage: NextPage = () => {
    const [circles, setCircles] = useState<Circle[]>([])
    const [user, setUser] = useState<User|null>(null)
    const { success, setSuccess } = useSuccess('')
    const [error, setError] = useState<string>('')
    const router = useRouter()
    const { userId } = router.query
    const { isMd } = useMediaQuery()

    useEffect(() => {
        const f = async () => {
            const { circles, user } = await getCircleListByUserId(Number(userId))
            setCircles(circles)
            setUser(user)
        }
        f()
    }, [])

    const onDeleteRelation = async (circleId: number) => {
        const data = await deleteRelationBetweenUserAndCircle(Number(userId), circleId)

        if (data && data.type === 'ValidationError') {
            setError(data.errors.data)
            return
        }

        const { circles, user } = await getCircleListByUserId(Number(userId))
        setCircles(circles)
        setUser(user)
        setSuccess('連携解除に成功しました', 3000)
    }

    return (
        <div>
            <Head>
                <title>所属サークル追加</title>
            </Head>

            {isMd ? (
                <BaseHeader />
            ) : ''}

            <BaseContainer>
                <BaseWrapper
                    title={user ? `${user.displayName}さんの所属サークル` : '所属サークル' }
                    actionText="所属サークル追加"
                    actionHref="/user/circle/[userId]/relation"
                    actionAs={`/user/circle/${userId}/relation`}
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
                        {circles.length > 0 ? (
                            circles.map((circle: Circle) => {
                                return <CircleUserRelationListItem
                                    key={`circle-${circle.id}`}
                                    circle={circle}
                                    userId={Number(userId)}
                                    onDeleteRelation={onDeleteRelation}
                                />
                            })
                        ) : ''}

                        {circles.length === 0 ? (
                            <div className="py-4">
                                <p className="text-white">まだサークルが登録されていません</p>
                            </div>
                        ) : ''}
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default IndexPage