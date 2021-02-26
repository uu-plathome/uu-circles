import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.min.css' //Swiperのnavigation用
import { useMediaQuery } from '@/hooks/useMediaQuery'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
type Props = {}
const MainUucircleTopButtons: FC<Props> = () => {
  const { isMd } = useMediaQuery()

  return (
    <div className="flex justify-center my-10">
      {isMd ? (
        <nav style={{ margin: 'auto!important' }}>
          <button
            className="mx-3 my-3"
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
                <Image
                  width="286"
                  height="65"
                  src="/images/topButtons/Rectangle15.png"
                />
              </a>
            </Link>
          </button>

          <button
            className="mx-3 my-3"
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
                <Image
                  width="286"
                  height="65"
                  src="/images/topButtons/shinkan1.png"
                />
              </a>
            </Link>
          </button>

          <button
            className="mx-3 my-3"
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
                <Image
                  width="286"
                  height="65"
                  src="/images/topButtons/discordBunner1.png"
                />
              </a>
            </Link>
          </button>
        </nav>
      ) : (
        <Swiper spaceBetween={50} slidesPerView={1} initialSlide={1} navigation>
          <nav
            className="mx-3"
            style={{ margin: 'auto!important' }}
            id="top-button-scroll"
          >
            <SwiperSlide className="text-center">
              <button
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
                    <Image
                      width="286"
                      height="65"
                      src="/images/topButtons/Rectangle15.png"
                    />
                  </a>
                </Link>
              </button>
            </SwiperSlide>
            <SwiperSlide className="text-center">
              <button
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
                    <Image
                      width="286"
                      height="65"
                      src="/images/topButtons/shinkan1.png"
                    />
                  </a>
                </Link>
              </button>
            </SwiperSlide>
            <SwiperSlide className="text-center">
              <button
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
                    <Image
                      width="286"
                      height="65"
                      src="/images/topButtons/discordBunner1.png"
                    />
                  </a>
                </Link>
              </button>
            </SwiperSlide>
          </nav>
        </Swiper>
      )}
    </div>
  )
}

export { MainUucircleTopButtons }
