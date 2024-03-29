import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { ImagePath } from '@/src/lib/enum/app/ImagePath'
import { Circle } from '@/src/lib/types/model/Circle'

/**
 * サークルの画像のサイズ
 */
const MAIN_IMAGE_SIZE = {
  MD_WIDTH: 80,
  MD_HEIGHT: 80,
  BASE_WIDTH: 62,
  BASE_HEIGHT: 62,
} as const

type Props = {
  circle: Circle
}
const CircleNameHeader: FC<Props> = ({ circle }) => {
  const { isMd } = useMediaQuery()

  return (
    <div className="flex justify-between items-center py-8 px-8 border-b border-gray-300">
      <div className="flex items-center">
        <div className="mr-4">
          <Link href="/circle/[circleId]" as={`/circle/${circle.id}`}>
            <a>
              <Image
                src={circle.mainImageUrl || ImagePath.NO_IMAGE_PATH}
                width={
                  isMd ? MAIN_IMAGE_SIZE.MD_WIDTH : MAIN_IMAGE_SIZE.BASE_WIDTH
                }
                height={
                  isMd ? MAIN_IMAGE_SIZE.MD_HEIGHT : MAIN_IMAGE_SIZE.BASE_HEIGHT
                }
                className="rounded-full"
              />
            </a>
          </Link>
        </div>

        <Link href="/circle/[circleId]" as={`/circle/${circle.id}`}>
          <a>
            <h1 className="text-lg md:text-2xl font-bold text-black">
              {circle.name}
            </h1>
          </a>
        </Link>
      </div>

      <div>
        <Link href="/">
          <a className="text-sm text-blue-500 hover:underline">切り替え</a>
        </Link>
      </div>
    </div>
  )
}

export { CircleNameHeader }
