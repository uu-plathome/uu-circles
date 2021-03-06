import { FC } from 'react'
import Link from 'next/link'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
const MainUucircleBottomButtons: FC = () => {
  const { isMd } = useMediaQuery()

  return (
    <div className="bg-gray-100  pt-10 pb-10 ">
      <div
        className="text-center my-8 mx-auto"
        style={{ width: isMd ? 'auto' : 280 }}
      >
        <h2 className="text-lg font-bold mb-2">新宇大生必見の情報サイト！</h2>
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
              className="rounded px-5 py-3 my-3 mx-3 bg-green-500 hover:opacity-80 hover:shadow-lg"
              style={{
                width: '280px',
                height: '65px',
              }}
            >
              <a href="https://media.uu-circles.com/2021/03/circle-select/" className="text-white" style={{ fontSize: '18px' }} target="_blank">
                先輩達のサークル選び
              </a>
            </button>

            <button
              className="rounded px-5 py-3 my-3 mx-3 bg-green-500 hover:opacity-80 hover:shadow-lg"
              style={{
                width: '280px',
                height: '65px',
              }}
            >
              <Link href="/">
                <a className="text-white" style={{ fontSize: '18px' }}>
                  C.C.Sに取材してみた
                </a>
              </Link>
            </button>

            <button
              className="rounded px-5 py-3 my-3 mx-3 bg-green-500 hover:opacity-80 hover:shadow-lg"
              style={{
                width: '280px',
                height: '65px',
              }}
            >
              <a href="https://media.uu-circles.com/2021/03/region-uu/" className="text-white " style={{ fontSize: '18px' }} target="_blank">
                地域で活躍する宇大生
              </a>
            </button>
          </nav>
        ) : (
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            initialSlide={1}
            loop
            navigation
          >
            <nav
              className=""
              style={{ margin: '0 auto!important' }}
              id="top-button-scroll"
            >
              <SwiperSlide className="text-center">
                <button
                  className="rounded px-5 py-3 bg-green-500 hover:opacity-80 hover:shadow-lg"
                  style={{
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
                  className="rounded px-5 py-3 bg-green-500 hover:opacity-80 hover:shadow-lg"
                  style={{
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
                  className="rounded px-5 py-3 bg-green-500 hover:opacity-80 hover:shadow-lg"
                  style={{
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
