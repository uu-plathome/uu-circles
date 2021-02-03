import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseSidebar } from '@/components/layouts/BaseSidebar'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { CircleNewJoyListItem } from '@/components/molecules/list_items/CircleNewJoyListItem'
import { AuthContext } from '@/contexts/AuthContext'
import { getCircleNewJoyList, deleteCircleNewJoy } from '@/infra/api/cirecle_new_joy'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Circle } from '@/lib/types/model/Circle'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'


const IndexPage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const router = useRouter()
    const [circle, setCircle] = useState<Circle|null>(null)
    const [circleNewJoys, setCircleNewJoys] = useState<CircleNewJoy[]>([])
    const { id } = router.query

    useEffect(() => {
        const f = async () => {
            const {
                circle,
                circleNewJoys
            } = await getCircleNewJoyList(Number(id), authContext.accessToken)
            setCircle(circle)
            setCircleNewJoys(circleNewJoys)
        }

        if (authContext.accessToken && !Array.isArray(id)) {
            f()
        }
    }, [ authContext.accessToken, id ])

    const onDelete = async (circleNewJoyId: number) => {
        await deleteCircleNewJoy(Number(id), circleNewJoyId, authContext.accessToken)

        const {
            circle,
            circleNewJoys
        } = await getCircleNewJoyList(Number(id), authContext.accessToken)
        setCircle(circle)
        setCircleNewJoys(circleNewJoys)
    }

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <BaseWrapper
                    title={(circle && circle.name) ? `${circle.name}の新歓` : 'loading...'}
                    actionText="新歓新規作成"
                    actionHref="/circle/[id]/newjoy/create"
                    actionAs={`/circle/${id}/newjoy/create`}
                >
                    <div className="border-2 border-gray-800 p-2">
                        {authContext.accessToken && circleNewJoys.length > 0 ? (
                            circleNewJoys.map((circleNewJoy: CircleNewJoy) => {
                                return <CircleNewJoyListItem
                                    key={`circle-${circleNewJoy.id}`}
                                    circleNewJoy={circleNewJoy}
                                    onDelete={onDelete}
                                />
                            })
                        ) : ''}
                        {authContext.accessToken && circleNewJoys.length === 0 ? (
                            <div className="py-4">
                                <p className="text-white">まだ新歓が登録されていません</p>
                            </div>
                        ) : ''}
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default IndexPage