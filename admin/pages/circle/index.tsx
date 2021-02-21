import { useEffect, useState } from 'react';
import { NextPage } from 'next'
import Head from 'next/head';
import Color from 'colors'
import { scroller } from "react-scroll";
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CircleListItem } from '@/components/molecules/list_items/CircleListItem'
import { getCircleList } from '@/infra/api/circle'
import { Circle } from '@/lib/types/model/Circle'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

type PaginateCircleCursor = {
    id: number,
    updatedAt: string
    previos: boolean
    next: boolean
} | null
const IndexPage: NextPage = () => {
    const [ circles, setCircles ] = useState<{
        hasNext: boolean | null
        hasPrevious: boolean | null
        nextCursor: PaginateCircleCursor
        previousCursor: PaginateCircleCursor
        records: Circle[]
    }>(undefined)
    const { isMd } = useMediaQuery()

    const foundCircleList = async (cursor: PaginateCircleCursor = null) => {
        setCircles(
            await getCircleList(cursor)
        )

        scroller.scrollTo("top", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    }

    useEffect(() => {
        const f = async () => {
            setCircles(
                await getCircleList({
                    id: null,
                    updatedAt: null,
                    previos: false,
                    next: true
                })
            )
        }
        f()
    }, [])

    return (
        <div id="top">
            <Head>
                <title>サークル一覧へようこそ</title>
            </Head>

            {isMd ? (
                <BaseHeader />
            ) : ''}

            <BaseContainer>
                <BaseWrapper
                    title="サークル一覧へようこそ"
                    actionText="サークル新規作成"
                    actionHref="/circle/create"
                >
                    <div className="border-2 border-gray-800 p-2">
                        {circles && circles.records.length > 0 ? (
                            circles.records.map((circle: Circle) => {
                                return <CircleListItem
                                    key={`circle-${circle.id}`}
                                    circle={circle}
                                />
                            })
                        ) : ''}

                        {circles && circles.records.length === 0 ? (
                            <div className="py-4">
                                <p className="text-white">まだサークルが登録されていません</p>
                            </div>
                        ) : ''}

                        {circles ? (
                            <div className="text-center">
                                <button
                                    className="mx-2 disabled:opacity-50 "
                                    disabled={!circles.hasPrevious}
                                    onClick={() => foundCircleList({
                                        ...circles.previousCursor,
                                        previos: true,
                                        next: false
                                    })}
                                >
                                    <FontAwesomeIcon color={Color.white} icon={faChevronCircleLeft} size="2x" />
                                </button>

                                <button
                                    className="mx-2 disabled:opacity-50 "
                                    disabled={!circles.hasNext}
                                    onClick={() => foundCircleList({
                                        ...circles.nextCursor,
                                        previos: false,
                                        next: true
                                    })}
                                >
                                    <FontAwesomeIcon color={Color.white} icon={faChevronCircleRight} size="2x" />
                                </button>
                            </div>
                        ) : ''}
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default IndexPage
