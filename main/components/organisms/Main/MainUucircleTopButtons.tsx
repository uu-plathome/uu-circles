import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
type Props = {}
const MainUucircleTopButtons: FC<Props> = () => {
  const { isSm } = useMediaQuery()

  return (
    <div className="flex justify-center pt-10 pb-10 bg-gray-100">
      {isSm ? (
        <nav className="flex">
          <div className="m-4">
            <Link href="/">
              <a className="text-gray-900 text-2xl">
                <Image
                  width="286"
                  height="65"
                  src="/images/topButtons/Rectangle15.png"
                />
              </a>
            </Link>
          </div>

          <div
            className="m-4"
            style={{
              width: '280px',
              height: '65px',
            }}
          >
            <Link href="/circle/newjoy">
              <a className="text-gray-900 text-2xl">
                <Image
                  width="286"
                  height="65"
                  src="/images/topButtons/shinkan1.png"
                />
              </a>
            </Link>
          </div>

          <div
            className="m-4"
            style={{
              width: '280px',
              height: '65px',
            }}
          >
            <Link href="/guide/discord">
              <a className="text-gray-900 text-2xl">
                <Image
                  width="286"
                  height="65"
                  src="/images/topButtons/discordBunner1.png"
                />
              </a>
            </Link>
          </div>
        </nav>
      ) : (
        <Swiper spaceBetween={50} slidesPerView={1} initialSlide={1} navigation>
          <nav className="mx-3" style={{ margin: 'auto!important' }}>
            <SwiperSlide>
              <div className="mx-auto"  style={{ width: 280, height: 65 }}>
                <Link href="/">
                  <a className="text-gray-900 block shadow-md" style={{ width: '100%', height: '100%' }}>
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
              <div className="mx-auto"  style={{ width: 280, height: 65 }}>
                <Link href="/">
                  <a className="text-gray-900 block shadow-md" style={{ width: '100%', height: '100%' }}>
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
              <div className="mx-auto"  style={{ width: 280, height: 65 }}>
                <Link href="/guide/discord">
                  <a className="text-gray-900 block shadow-md" style={{ width: '100%', height: '100%' }}>
                    <Image
                      width="280"
                      height="65"
                      src="/images/topButtons/discordBunner1.png"
                      className="shadow-md"
                    />
                  </a>
                </Link>
              </div>
            </SwiperSlide>
          </nav>
        </Swiper>
      )}
    </div>
  )
}

export { MainUucircleTopButtons }
