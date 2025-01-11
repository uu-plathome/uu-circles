import Image from 'next/image'
import Link from 'next/link'
import { VFC } from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

type SpButtonProps = {
  href: string
  src: string
  alt: string
}
const SpButton: VFC<SpButtonProps> = ({ href, src, alt }) => {
  return (
    <div className="mx-auto" style={{ width: 280, height: 65 }}>
      <Link href={href}>
        <a
          className="block text-gray-900 rounded shadow"
          style={{ width: '100%', height: '100%' }}
        >
          <Image width="280" height="65" src={src} alt={alt} />
        </a>
      </Link>
    </div>
  )
}

type SpButtonGroupProps = {}
const SpButtonGroup: VFC<SpButtonGroupProps> = () => {
  const { isSm } = useMediaQuery()

  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={isSm ? 2 : 1}
        initialSlide={1}
        centeredSlides
        navigation={isSm ? false : true}
        loop
        tag="nav"
      >
        <SwiperSlide>
          <SpButton
            href="/guide/to-new-students"
            src="/images/topButtons/Rectangle15.png"
            alt="新入生へ"
          />
        </SwiperSlide>

        <SwiperSlide>
          <SpButton
            href="/circle/newjoy"
            src="/images/topButtons/shinkan1.png"
            alt="今日の新歓"
          />
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export type { SpButtonGroupProps }
export { SpButtonGroup }
