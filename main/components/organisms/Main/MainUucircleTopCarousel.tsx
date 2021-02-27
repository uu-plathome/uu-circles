import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.min.css' //Swiperのnavigation用
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useWindowResize } from '@/hooks/useWindowResize'
import { useEffect, useState } from 'react'

SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y])
type Props = {}
const MainUucircleTopCarousel: FC<Props> = () => {
  const { isMd } = useMediaQuery()
  const { width } = useWindowResize()
  const [height, setHeight] = useState(0)
  const params = {
    //Swiperの設定

    initialSlide: 1,
    spaceBetween: 50,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  }
  return (
    <div className="flex justify-center bg-gray-100">
      {isMd ? (
        <Swiper {...params}>
          <nav className="" style={{ margin: 'auto!important' }}>
            <SwiperSlide className="text-center">
              <button
                style={
                  {
                    // backgroundColor: '#faf6e3',
                  }
                }
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
                      width="382"
                      height="200"
                      src="/images/topCarousel/Rectangle16.png"
                    />
                  </a>
                </Link>
              </button>
            </SwiperSlide>
            <SwiperSlide className="text-center">
              <button
                style={
                  {
                    // backgroundColor: '#faf6e3',
                  }
                }
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
                    {' '}
                    <Image
                      src="/images/top-image.png"
                      width="382"
                      height="200"
                      objectFit="cover"
                      alt="UU-circlesへようこそ！"
                    />
                    {/* <Image
                   width="382"
                   height="200"
                   src="/images/topCarousel/新歓サイトトップ画像1.png"
                 /> */}
                  </a>
                </Link>
              </button>
            </SwiperSlide>
            <SwiperSlide className="text-center">
              <button
                style={
                  {
                    // backgroundColor: '#faf6e3',
                  }
                }
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
                      width="382"
                      height="200"
                      src="/images/topCarousel/Rectangle16.png"
                    />
                  </a>
                </Link>
              </button>
            </SwiperSlide>
          </nav>
        </Swiper>
      ) : (
        <Swiper {...params}>
          <nav className="" style={{ margin: 'auto!important' }}>
            <SwiperSlide className="text-center">
              <button
                style={
                  {
                    // backgroundColor: '#faf6e3',
                  }
                }
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
                      width="382"
                      height="200"
                      src="/images/topCarousel/Rectangle16.png"
                    />
                  </a>
                </Link>
              </button>
            </SwiperSlide>
            <SwiperSlide className="text-center">
              <button
                style={
                  {
                    // backgroundColor: '#faf6e3',
                  }
                }
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
                    {' '}
                    <Image
                      src="/images/top-image.png"
                      width="382"
                      height="200"
                      objectFit="cover"
                      alt="UU-circlesへようこそ！"
                    />
                    {/* <Image
                      width="382"
                      height="200"
                      src="/images/topCarousel/新歓サイトトップ画像1.png"
                    /> */}
                  </a>
                </Link>
              </button>
            </SwiperSlide>
            <SwiperSlide className="text-center">
              <button
                style={
                  {
                    // backgroundColor: '#faf6e3',
                  }
                }
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
                      width="382"
                      height="200"
                      src="/images/topCarousel/Rectangle16.png"
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

export { MainUucircleTopCarousel }
