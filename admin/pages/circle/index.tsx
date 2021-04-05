import { SearchTextField } from '@/components/atoms/form/SearchTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CircleListItem } from '@/components/molecules/list_items/CircleListItem'
import { useStringInput } from '@/hooks/useInput'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { paginateCircleList } from '@/infra/api/circle'
import { Circle } from '@/lib/types/model/Circle'
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Color from 'colors'
import { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent, useEffect, useState } from 'react'
import { scroller } from 'react-scroll'

type PaginateCircleCursor = {
  'circles.id'?: number
  'circleInformation.updatedAt'?: string
  previos: boolean
  next: boolean
  name?: string
} | null
const IndexPage: NextPage = () => {
  const [circles, setCircles] = useState<{
    hasNext: boolean | null
    hasPrevious: boolean | null
    nextCursor: PaginateCircleCursor
    previousCursor: PaginateCircleCursor
    records: Circle[]
  }>(undefined)
  const { isMd } = useMediaQuery()
  const name = useStringInput('')

  const foundCircleList = async (cursor: PaginateCircleCursor = null) => {
    setCircles(await paginateCircleList(cursor))

    scroller.scrollTo('top', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    })
  }

  useEffect(() => {
    const f = async () => {
      setCircles(
        await paginateCircleList({
          'circles.id': null,
          'circleInformation.updatedAt': null,
          previos: false,
          next: true,
          name: name.value,
        })
      )
    }
    f()
  }, [])

  const onSearchSubmit = (event: FormEvent) => {
    event.preventDefault()

    foundCircleList({
      'circles.id': null,
      'circleInformation.updatedAt': null,
      previos: false,
      next: true,
      name: name.value,
    })
  }

  return (
    <div id="top">
      <Head>
        <title>サークル一覧へようこそ</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper
          title="サークル一覧へようこそ"
          actionText="サークル新規作成"
          actionHref="/circle/create"
        >
          <div className="border-2 border-gray-800 p-2">
            {circles ? (
              <div className="py-4 mb-8">
                <p className="text-white">サークル名検索</p>

                <form onSubmit={onSearchSubmit}>
                  <SearchTextField
                    id="nameSearch"
                    name="nameSearch"
                    expand
                    {...name}
                  />
                </form>
              </div>
            ) : (
              ''
            )}

            {circles && circles.records.length > 0
              ? circles.records.map((circle: Circle) => {
                  return (
                    <CircleListItem
                      key={`circle-${circle.id}`}
                      circle={circle}
                    />
                  )
                })
              : ''}

            {circles && circles.records.length === 0 ? (
              <div className="py-4">
                <p className="text-white">まだサークルが登録されていません</p>
              </div>
            ) : (
              ''
            )}

            {circles ? (
              <div className="text-center">
                <button
                  className="mx-2 disabled:opacity-50 "
                  disabled={!circles.hasPrevious}
                  onClick={() =>
                    foundCircleList({
                      ...circles.previousCursor,
                      previos: true,
                      next: false,
                      name: name.value,
                    })
                  }
                >
                  <FontAwesomeIcon
                    color={Color.white}
                    icon={faChevronCircleLeft}
                    size="2x"
                  />
                </button>

                <button
                  className="mx-2 disabled:opacity-50 "
                  disabled={!circles.hasNext}
                  onClick={() =>
                    foundCircleList({
                      ...circles.nextCursor,
                      previos: false,
                      next: true,
                      name: name.value,
                    })
                  }
                >
                  <FontAwesomeIcon
                    color={Color.white}
                    icon={faChevronCircleRight}
                    size="2x"
                  />
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default IndexPage
