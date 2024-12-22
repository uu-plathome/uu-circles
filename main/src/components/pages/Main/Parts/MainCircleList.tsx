import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Circle } from '@/src/lib/types/model/Circle'

type Props = {
  id: string
  circles: Circle[]
}
const MainCircleList: FC<Props> = ({ circles, id }) => {
  const width = 400
  // w : h = 210 : 297
  const height = (width * 297) / 210

  const [isOn, setIsOn] = useState(false)

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
    >
      {circles.map((circle, idx) => {
        return (
          <div
            id={`${id}-${circle.slug}`}
            key={`MainCircleList-${circle.slug}-${idx}`}
            className="mb-6 md:mb-16"
          >
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

export type { Props }
export { MainCircleList }
