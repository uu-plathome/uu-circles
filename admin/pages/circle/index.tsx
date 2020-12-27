
import { BlueButton } from '@/components/atoms/buttons/BlueButton'
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseSidebar } from '@/components/layouts/BaseSidebar'
import { CircleListItem } from '@/components/molecules/list_items/CircleListItem'
import { AuthContext } from '@/contexts/AuthContext'
import { getCircleList } from '@/infra/api/circle'
import { Circle } from '@/infra/api/types'
import { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { BaseHeader } from '../../components/layouts/BaseHeader'


const IndexPage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const [circles, setCircles] = useState<Circle[]>([])

    useEffect(() => {
        const f = async () => {
            setCircles(await getCircleList(authContext.accessToken))
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
                                サークル一覧へようこそ
                            </h1>

                            <GreenButton href="/circle/create">
                                サークル新規作成
                            </GreenButton>
                        </div>

                        <div className="border-2 border-gray-800 p-2">
                            {
                                circles.map((circle: Circle) => {
                                    return <CircleListItem
                                        key={`circle-${circle.id}`} 
                                        circle={circle}
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