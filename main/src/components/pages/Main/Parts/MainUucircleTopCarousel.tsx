import Image from 'next/image'
import { FC } from 'react'
import { useEffect, useState } from 'react'
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { useWindowResize } from '@/src/hooks/useWindowResize'
import { Advertise } from '@/src/lib/types/model/Advertise'

SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y])

type Props = {
  advertises: Advertise[]
}
const MainUucircleTopCarousel: FC<Props> = ({ advertises }) => {
  const { isMd } = useMediaQuery()
  const { width } = useWindowResize()
  const [height, setHeight] = useState(196)

  useEffect(() => {
    setHeight((isMd ? 330 : (width * 4192) / 8001) || 196)
  }, [isMd, width])

  const params: Swiper = {
    //Swiperの設定
    initialSlide: 0,
    spaceBetween: 50,
    centeredSlides: true,
    autoplay: {
      delay: 10000,
      disableOnInteraction: false,
    },
    loop: true,
  }

  return (
    <div className="flex justify-center bg-gray-100">
      <Swiper tag="nav" {...params}>
        <SwiperSlide>
          <Image
            src="/images/top-image.png"
            width={width || 1000}
            height={height}
            objectFit="cover"
            alt="宇都宮大学の“知りたいサークル“を知る場所"
          />
        </SwiperSlide>

        {advertises &&
          advertises.map((advertise) => {
            return (
              <SwiperSlide key={advertise.id}>
                <div className="relative">
                  {advertise.link ? (
                    <a
                      href={`${process.env.API_URL}/share/advertise/${advertise.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        width={width || 1000}
                        height={height}
                        objectFit="cover"
                        alt={`${advertise.title} - トップ広告`}
                        src={advertise.mainImageUrl || '/images/top-image.png'}
                      />
                    </a>
                  ) : (
                    <Image
                      width={width || 1000}
                      height={height}
                      objectFit="cover"
                      alt={`${advertise.title} - トップ広告`}
                      src={advertise.mainImageUrl || '/images/top-image.png'}
                    />
                  )}
                </div>

                <div className="absolute top-2 left-2">
                  <div className="p-2 px-4 text-xs bg-gray-300 rounded">
                    広告
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}

export { MainUucircleTopCarousel }
