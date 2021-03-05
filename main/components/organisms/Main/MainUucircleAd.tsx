import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type Props = {}
const MainUucircleAd: FC<Props> = () => {
  const { isMd } = useMediaQuery()
  const [width, setWidth] = useState(220)
  const [height, setHeight] = useState(130)

  useEffect(() => {
    setWidth(isMd ? 330 : 220)
    // w : h = 220 : 130
    const newHeight = (width * 130) / 220
    setHeight(newHeight)
  })

  return (
    <div className="bg-gray-100 md:grid md:grid-cols-2 gap-6 pt-10">
      <div className="mb-10 mx-auto md:ml-auto md:mr-0" style={{ width }}>
        <a
          href="https://media.uu-circles.com/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/images/Ulab_site_ad.jpg"
            alt="メディアサイト"
            width={width}
            height={height}
            className="rounded"
            objectFit="cover"
          />
        </a>
        <p className="text-center text-sm text-gray-600 pt-1">メディアサイト</p>
      </div>

      <div className="mb-10 mx-auto md:mr-auto md:ml-0" style={{ width }}>
        <a href="https://miyameshi.com/" target="_blank" rel="noreferrer">
          <Image
            src="/images/miyameshi-phone-top.jpg"
            alt="みやメシ.com"
            width={width}
            height={height}
            className="rounded"
            objectFit="cover"
          />
        </a>
        <p className="text-center text-sm text-gray-600 pt-1">みやメシ.com</p>
      </div>

      <div className="mb-10 mx-auto md:ml-auto md:mr-0" style={{ width }}>
        <a href="https://ulab-uu.com" target="_blank" rel="noreferrer">
          <Image
            src="/images/Ulab_site_ad.jpg"
            alt="u-lab公式サイト"
            width={width}
            height={height}
            className="rounded"
            objectFit="cover"
          />
        </a>
        <p className="text-center text-sm text-gray-600 pt-1">
          U-lab公式サイト
        </p>
      </div>
    </div>
  )
}

export { MainUucircleAd }
