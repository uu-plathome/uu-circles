import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { Circle } from '@/src/lib/types/model/Circle'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

type Props = {
  circles: Circle[]
}
const CarouselCircleList: FC<Props> = ({ circles }) => {
  const width = 150
  // w : h = 210 : 297
  const height = (width * 297) / 210
  const { isMd } = useMediaQuery()
  const params: Swiper = {
    //Swiperの設定
    initialSlide: 0,
    spaceBetween: 50,
    slidesPerView: 2,
    centeredSlides: true,
    pagination: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
  }
  return (
    <>
      {isMd ? (
        <div className="grid grid-cols-2 gap-6 max-w-screen-md md:grid-cols-3 md:mx-auto">
          {circles.map((circle) => {
            return (
              <div key={`isMd-${circle.slug}`}>
                <div className="mb-6 md:mb-16">
                  <Link
                    href="/circle/[slug]"
                    as={`/circle/${circle.slug}`}
                    prefetch={false}
                  >
                    <a>
                      <Image
                        src={circle.handbillImageUrl}
                        alt={`${circle.name}のビラ`}
                        width={width}
                        height={height}
                        className="rounded"
                        objectFit="cover"
                      />
                    </a>
                  </Link>

                  <h3 className="pt-1 text-sm text-center text-gray-600">
                    {circle.name}
                  </h3>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <Swiper {...params}>
          <div className="grid grid-cols-2 gap-6 max-w-screen-md md:grid-cols-4 md:mx-auto">
            {circles.map((circle) => {
              return (
                <SwiperSlide key={`not-isMd-${circle.slug}`}>
                  <div className="flex justify-center pb-10">
                    <div>
                      <Link
                        href="/circle/[slug]"
                        as={`/circle/${circle.slug}`}
                        prefetch={false}
                      >
                        <a>
                          <Image
                            src={circle.handbillImageUrl}
                            alt={`${circle.name}のビラ`}
                            width={width}
                            height={height}
                            className="rounded"
                            objectFit="cover"
                          />
                        </a>
                      </Link>

                      <h3 className="pt-1 text-sm text-center text-gray-600">
                        {circle.name}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </div>
        </Swiper>
      )}
    </>
  )
}

export { CarouselCircleList }
