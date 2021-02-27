import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/components/navigation/navigation.min.css' //Swiperのnavigation用
import { useMediaQuery } from '@/hooks/useMediaQuery'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
type Props = {}
const MainUucircleBottomButtons: FC<Props> = () => {
  const { isMd } = useMediaQuery()

  return (
    <div className="bg-gray-100  pt-10 pb-10 ">
      <div className="text-center mb-4 mx-8">
        <h2 className="font-bold text-xl">新宇大生必見の情報サイト！</h2>
        <p className="text-sm">
          アパートの探し方から美味しいお店、おすすめのカフェまで全てここ！
        </p>
      </div>
      <div className="flex justify-center ">
        {isMd ? (
          <nav
            className="horizontal_scroll md:flex md:justify-center"
            style={{ margin: '0 auto!important' }}
            id="top-button-scroll"
          >
            <button
              className="rounded px-5 py-3 my-3 mx-3"
              style={{
                backgroundColor: '#c4c4c4',
                width: '280px',
                height: '65px',
              }}
            >
              <Link href="/">
                <a className="text-white" style={{ fontSize: '18px' }}>
                  新生活の初め方
                </a>
              </Link>
            </button>

            <button
              className="rounded px-5 py-3 my-3 mx-3"
              style={{
                backgroundColor: '#fb8f8f',
                width: '280px',
                height: '65px',
              }}
            >
              <Link href="/">
                <a className="text-white" style={{ fontSize: '18px' }}>
                  先輩が教えるおすすめバイト
                </a>
              </Link>
            </button>

            <button
              className="rounded px-5 py-3 my-3 mx-3"
              style={{
                backgroundColor: '#c4c4c4',
                width: '280px',
                height: '65px',
              }}
            >
              <Link href="/">
                <a className="text-white " style={{ fontSize: '18px' }}>
                  自転車ってどこで買うの？
                </a>
              </Link>
            </button>
          </nav>
        ) : (
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            initialSlide={1}
            navigation
          >
            <nav
              className=""
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
                  <Link href="/">
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
                  <Link href="/">
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
                  <Link href="/">
                    <a className="text-white " style={{ fontSize: '18px' }}>
                      自転車ってどこで買うの？
                    </a>
                  </Link>
                </button>
              </SwiperSlide>
            </nav>
          </Swiper>
        )}
      </div>
    </div>
  )
}

export { MainUucircleBottomButtons }
