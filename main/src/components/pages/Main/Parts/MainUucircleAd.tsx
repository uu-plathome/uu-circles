import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { ImagePath } from '@/src/lib/enum/app/ImagePath'

type Props = Record<string, never>
const MainUucircleAd: FC<Props> = () => {
  const { isMd } = useMediaQuery()
  const [width, setWidth] = useState(220)
  const [height, setHeight] = useState(130)

  useEffect(() => {
    setWidth(isMd ? 330 : 220)
    // w : h = 220 : 130
    const newHeight = (width * 130) / 220
    setHeight(newHeight)
  }, [isMd, width])

  return (
    <div className="md:grid md:grid-cols-2 gap-6 pt-10 bg-gray-100">
      <div className="mx-auto md:mr-0 mb-10 md:ml-auto" style={{ width }}>
        <a
          href="https://media.uu-circles.com/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={ImagePath.UU_YELL.MAIN}
            alt="メディアサイト"
            width={width}
            height={height}
            className="rounded"
            objectFit="cover"
          />
        </a>
        <p className="pt-1 text-sm text-center text-gray-600">メディアサイト uu-yell</p>
      </div>

      <div className="mx-auto md:mr-auto mb-10 md:ml-0" style={{ width }}>
        <a href="https://uu-plathome.com" target="_blank" rel="noreferrer">
          <Image
            src={ImagePath.UUPH.THUMBNAIL}
            alt="UU-PlatHome公式サイト"
            width={width}
            height={height}
            className="rounded"
            objectFit="cover"
          />
        </a>
        <p className="pt-1 text-sm text-center text-gray-600">
          UU-PlatHome公式サイト
        </p>
      </div>
    </div>
  )
}

export type { Props }
export { MainUucircleAd }
