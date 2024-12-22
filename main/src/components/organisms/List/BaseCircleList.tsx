import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Circle } from '@/src/lib/types/model/Circle'

/**
 * サークルが見つからないとき
 */
const CircleListWhenEmpty: FC<{
  id: string
}> = ({ id }) => {
  return (
    <div id={`${id}_empty`} className="pt-4 pb-12">
      <p className="mb-4 text-black">サークルが見つかりませんでした。</p>
      <p className="text-blue-600">
        <Link href="/circle">
          <p className="underline">サークル一覧へ戻る</p>
        </Link>
      </p>
    </div>
  )
}

type Props = {
  id: string
  circles: Circle[]
}
const BaseCircleList: FC<Props> = ({ id, circles }) => {
  const width = 400
  // w : h = 210 : 297
  const height = (width * 297) / 210

  return (
    <>
      {circles.length > 0 ? (
        <div
          id={id}
          className="grid grid-cols-2 md:grid-cols-3 gap-7 md:mx-auto max-w-screen-md"
        >
          {circles.map((circle, idx) => {
            return (
              <div
                id={`${id}_${idx}`}
                key={`BaseCircleList-${circle.slug}`}
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
      ) : (
        <CircleListWhenEmpty id={id} />
      )}
    </>
  )
}

export { BaseCircleList }
