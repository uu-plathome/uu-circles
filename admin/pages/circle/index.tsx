import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CircleListItem } from '@/components/molecules/list_items/CircleListItem'
import { AuthContext } from '@/contexts/AuthContext'
import { getCircleList } from '@/infra/api/circle'
import { Circle } from '@/lib/types/model/Circle'
import { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { BaseHeader } from '../../components/layouts/BaseHeader'


const IndexPage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const [circles, setCircles] = useState<Circle[]>([])

    useEffect(() => {
        const f = async () => {
            setCircles(await getCircleList())
        }
        f()
    }, [])

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <BaseWrapper
                    title="サークル一覧へようこそ"
                    actionText="サークル新規作成"
                    actionHref="/circle/create"
                >
                    <div className="border-2 border-gray-800 p-2">
                        {authContext.accessToken && circles.length > 0 ? (
                            circles.map((circle: Circle) => {
                                return <CircleListItem
                                    key={`circle-${circle.id}`}
                                    circle={circle}
                                />
                            })
                        ) : ''}

                        {authContext.accessToken && circles.length === 0 ? (
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