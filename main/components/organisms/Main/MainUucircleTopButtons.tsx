import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
const SpButtonGroup = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      initialSlide={1}
      navigation
      loop
    >
      <nav className="mx-4">
        <SwiperSlide>
          <div className="mx-auto" style={{ width: 280, height: 65 }}>
            <Link href="/">
              <a
                className="text-gray-900 block shadow rounded"
                style={{ width: '100%', height: '100%' }}
              >
                <Image
                  width="280"
                  height="65"
                  src="/images/topButtons/Rectangle15.png"
                />
              </a>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="mx-auto" style={{ width: 280, height: 65 }}>
            <Link href="/">
              <a
                className="text-gray-900 block shadow rounded"
                style={{ width: '100%', height: '100%' }}
              >
                <Image
                  width="280"
                  height="65"
                  src="/images/topButtons/shinkan1.png"
                />
              </a>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="mx-auto" style={{ width: 280, height: 65 }}>
            <Link href="/guide/discord">
              <a
                className="text-gray-900 block shadow rounded"
                style={{ width: '100%', height: '100%' }}
              >
                <Image
                  width="280"
                  height="65"
                  src="/images/topButtons/discordBunner1.png"
                />
              </a>
            </Link>
          </div>
        </SwiperSlide>
      </nav>
    </Swiper>
  )
}
const PcButtonGroup = () => {
  return (
    <nav className="flex">
      <div className="m-4">
        <Link href="/">
          <a
            className="text-gray-900 block shadow rounded"
            style={{ width: 280, height: 65 }}
          >
            <Image
              width="280"
              height="65"
              src="/images/topButtons/Rectangle15.png"
            />
          </a>
        </Link>
      </div>

      <div className="m-4">
        <Link href="/circle/newjoy">
          <a
            className="text-gray-900 block shadow rounded"
            style={{ width: 280, height: 65 }}
          >
            <Image
              width="280"
              height="65"
              src="/images/topButtons/shinkan1.png"
            />
          </a>
        </Link>
      </div>

      <div className="m-4">
        <Link href="/guide/discord">
          <a
            className="text-gray-900 block shadow rounded"
            style={{ width: 280, height: 65 }}
          >
            <Image
              width="280"
              height="65"
              src="/images/topButtons/discordBunner1.png"
            />
          </a>
        </Link>
      </div>
    </nav>
  )
}

type Props = {}
const MainUucircleTopButtons: FC<Props> = () => {
  const { isMd } = useMediaQuery()

  return (
    <div className="flex justify-center pt-10 pb-10 bg-gray-100">
      {isMd ? <PcButtonGroup /> : <SpButtonGroup />}
    </div>
  )
}

export { MainUucircleTopButtons }
