import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Circle } from '@/src/lib/types/model/Circle'

type Props = {
  id: string
  circles: Circle[]
  onChangeId: (id: string) => void
}
const MainCircleList: FC<Props> = ({ circles, id, onChangeId }) => {
  const width = 400
  // w : h = 210 : 297
  const height = (width * 297) / 210

  return (
    <div
      id={id}
      className="max-w-screen-md md:mx-auto grid grid-cols-2 md:grid-cols-4 gap-7"
      onMouseOver={() => onChangeId(id)}
    >
      {circles.map((circle, idx) => {
        return (
          <div
            id={`${id}-${idx}`}
            key={`MainCircleList-${circle.slug}`}
            className="mb-6 md:mb-16"
            onMouseOver={() => onChangeId(`${id}-${idx}`)}
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

            <h3 className="text-center text-sm text-gray-600 pt-1">
              {circle.name}
            </h3>
          </div>
        )
      })}
    </div>
  )
}

export { MainCircleList }
