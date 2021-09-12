import Image from 'next/image'
import Link from 'next/link'
import { FC, useCallback } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { ComputedPagePositionIdNowLength } from '../computedPagePositionIdNowLength'
import { Utas } from '@/src/components/atoms/utas/Utas'
import { Circle } from '@/src/lib/types/model/Circle'

type Props = {
  id: string
  circles: Circle[]
  onChangeId: (id: string) => void
  pagePositionIdNowLength: ComputedPagePositionIdNowLength
}
const MainCircleList: FC<Props> = ({
  circles,
  id,
  pagePositionIdNowLength,
  onChangeId,
}) => {
  const width = 400
  // w : h = 210 : 297
  const height = (width * 297) / 210

  const [isOn, setIsOn] = useState(false)

  const pageViewsByCircleSlug = useCallback(
    (slug: string) => {
      const circle = circles.find((c) => c.slug === slug)
      if (!circle) return 0

      const p = pagePositionIdNowLength.circlePageViews.find(
        (p) => p.circleSlug === slug
      )
      if (!p) return 0

      return p.count
    },
    [circles, pagePositionIdNowLength]
  )

  useEffect(() => {
    setIsOn(true)
  }, [])

  if (!isOn) {
    return <div />
  }

  return (
    <div
      id={id}
      className="grid grid-cols-2 md:grid-cols-4 gap-7 md:mx-auto max-w-screen-md"
      onMouseOver={() => onChangeId(id)}
    >
      {circles.map((circle, idx) => {
        const _pageViewsByCircleSlug = pageViewsByCircleSlug(circle.slug)
        return (
          <div
            id={`${id}-${circle.slug}`}
            key={`MainCircleList-${circle.slug}-${idx}`}
            className="mb-6 md:mb-16"
            onMouseOver={() => onChangeId(`${id}-${circle.slug}`)}
          >
            <div className="hidden md:block">
              {_pageViewsByCircleSlug > 0 ? (
                <Utas
                  num={_pageViewsByCircleSlug >= 7 ? 7 : _pageViewsByCircleSlug}
                />
              ) : (
                <div className="pt-8" />
              )}
            </div>

            <Link
              href="/circle/[slug]"
              as={`/circle/${circle.slug}`}
              prefetch={false}
            >
              <a>
                <Image
                  src={circle.handbillImageUrl}
                  alt={`${circle.name}のビラ`}
                  width={width}
                  height={height}
                  className="rounded"
                  objectFit="cover"
                />
              </a>
            </Link>

            <h3 className="pt-1 text-sm text-center text-gray-600">
              {circle.name}
            </h3>
          </div>
        )
      })}
    </div>
  )
}

export { MainCircleList }
