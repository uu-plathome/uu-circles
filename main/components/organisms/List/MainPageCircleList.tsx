import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Circle } from '@/lib/types/model/Circle'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.min.css' //Swiperのnavigation用
import { useMediaQuery } from '@/hooks/useMediaQuery'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
type Props = {
  circles: Circle[]
}
const MainPageCircleList: FC<Props> = ({ circles }) => {
  const width = 400
  // w : h = 210 : 297
  const height = (width * 297) / 210
  const { isMd } = useMediaQuery()

  return (
    <div>
      {isMd ? (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation
        >
          {/* <div className="max-w-screen-md md:mx-auto grid grid-cols-3 gap-4"> */}
          <div className=" mx-auto max-w-screen-md md:mx-auto md:grid md:grid-cols-3 md:gap-4">
            {circles.map((circle) => {
              return (
                <SwiperSlide className="text-center">
                  <div key={circle.id}>
                    <Link href="/circle/[slug]" as={`/circle/${circle.slug}`}>
                      <a>
                        <Image
                          src={circle.handbillImageUrl}
                          alt={`${circle.name}のビラ`}
                          width={width}
                          height={height}
                        />
                      </a>
                    </Link>

                    <h3 className="text-center font-bold">{circle.name}</h3>
                  </div>
                </SwiperSlide>
              )
            })}
          </div>
        </Swiper>
      ) : (
        <div className="horizontal_scroll mx-auto max-w-screen-md md:mx-auto md:grid md:grid-cols-3 md:gap-4">
          {circles.map((circle) => {
            return (
              <div key={circle.id}>
                <Link href="/circle/[slug]" as={`/circle/${circle.slug}`}>
                  <a>
                    <Image
                      src={circle.handbillImageUrl}
                      alt={`${circle.name}のビラ`}
                      width={width}
                      height={height}
                    />
                  </a>
                </Link>

                <h3 className="text-center font-bold">{circle.name}</h3>
              </div>
            )
          })}
        </div>
      )}

      <div className="text-center mt-10 mb-10">
        <Link href="">
          <a
            className=" rounded-full bg-green-500 p-4 mt-10 text-white"
            style={{ width: '115px', height: '40px' }}
          >
            もっと見る
          </a>
        </Link>
      </div>
    </div>
  )
}

export { MainPageCircleList }
