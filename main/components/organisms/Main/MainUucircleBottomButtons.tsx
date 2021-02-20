import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.min.css' //Swiperのnavigation用
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
type Props = {}
const MainUucircleBottomButtons: FC<Props> = () => {
  return (
    <div className="flex justify-center">
      <Swiper spaceBetween={50} slidesPerView={1} initialSlide={1} navigation>
        <nav
          className="horizontal_scroll md:flex md:justify-center"
          style={{ margin: '0 auto!important' }}
          id="top-button-scroll"
        >
          <SwiperSlide className="text-center">
            <button
              className="rounded px-5 py-3 "
              style={{
                backgroundColor: '#c4c4c4',
                width: '280px',
                height: '65px',
              }}
            >
              <Link href="">
                <a className="text-white" style={{ fontSize: '18px' }}>
                  新生活の初め方
                </a>
              </Link>
            </button>
          </SwiperSlide>
          <SwiperSlide className="text-center">
            <button
              className="rounded px-5 py-3 "
              style={{
                backgroundColor: '#fb8f8f',
                width: '280px',
                height: '65px',
              }}
            >
              <Link href="">
                <a className="text-white" style={{ fontSize: '18px' }}>
                  先輩が教えるおすすめバイト
                </a>
              </Link>
            </button>
          </SwiperSlide>
          <SwiperSlide className="text-center">
            <button
              className="rounded px-5 py-3 "
              style={{
                backgroundColor: '#c4c4c4',
                width: '280px',
                height: '65px',
              }}
            >
              <Link href="">
                <a className="text-white " style={{ fontSize: '18px' }}>
                  自転車ってどこで買うの？
                </a>
              </Link>
            </button>
          </SwiperSlide>
        </nav>
      </Swiper>
    </div>
  )
}

export { MainUucircleBottomButtons }
