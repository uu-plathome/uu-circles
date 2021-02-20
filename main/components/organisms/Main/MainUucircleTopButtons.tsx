import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
type Props = {}
const MainUucircleTopButtons: FC<Props> = () => {
  if (process.browser) {
    // ブラウザ側で使う処理
    // console.log('')
    // const scrollElement = document.getElementById('top-button-scroll')
    // scrollElement.scrollTop = 300
  }
  return (
    <div className="flex justify-center">
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <nav
          className="horizontal_scroll md:flex md:justify-center"
          style={{ margin: '0 auto!important' }}
          id="top-button-scroll"
        >
          <SwiperSlide>
            <button
              className="w-screen rounded  m-10  focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2"
              style={{
                // backgroundColor: '#faf6e3',
                width: '280px',
                height: '65px',
              }}
            >
              <Link href="">
                <a
                  className="text-gray-900 text-2xl"
                  style={
                    {
                      // borderBottom: '3px solid #66c7eb',
                    }
                  }
                >
                  <img src="/images/tobButtons/Rectangle15.png"></img>
                </a>
              </Link>
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button
              className="w-screen rounded  m-10  focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2"
              style={{
                // backgroundColor: '#faf6e3',
                width: '280px',
                height: '65px',
              }}
            >
              <Link href="">
                <a
                  className="text-gray-900 text-2xl"
                  style={
                    {
                      // borderBottom: '3px solid #66c7eb',
                    }
                  }
                >
                  <img src="/images/tobButtons/shinkan1.png"></img>
                </a>
              </Link>
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button
              className="w-screen rounded  m-10  focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2"
              style={{
                // backgroundColor: '#faf6e3',
                width: '280px',
                height: '65px',
              }}
            >
              <Link href="">
                <a
                  className="text-gray-900 text-2xl"
                  style={
                    {
                      // borderBottom: '3px solid #66c7eb',
                    }
                  }
                >
                  <img src="/images/tobButtons/discordBunner1.png"></img>
                </a>
              </Link>
            </button>
          </SwiperSlide>
        </nav>
      </Swiper>
    </div>
  )
}

export { MainUucircleTopButtons }
