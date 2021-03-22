import { FC } from 'react'
import Image from 'next/image'
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useWindowResize } from '@/hooks/useWindowResize'
import { useEffect, useState } from 'react'
import { Advertise } from '@/lib/types/model/Advertise'

SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y])

type Props = {
  advertises: Advertise[]
}
const MainUucircleTopCarousel: FC<Props> = ({ advertises }) => {
  const { isMd } = useMediaQuery()
  const { width } = useWindowResize()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setHeight(isMd ? 330 : (width * 4192) / 8001)
  }, [isMd, width])

  const params: Swiper = {
    //Swiperの設定
    initialSlide: 0,
    spaceBetween: 50,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
  }

  return (
    <div className="flex justify-center bg-gray-100">
      <Swiper {...params}>
        <nav>
          <SwiperSlide>
            <Image
              src="/images/top-image.png"
              width={width || 1000}
              height={height}
              objectFit="cover"
              alt="UU-Circlesへようこそ！"
            />
          </SwiperSlide>

          {advertises && advertises.map(advertise => {
            return (
              <SwiperSlide key={advertise.id}>
                <a
                  href={advertise.link}
                  target="_blank"
                  rel="noopener"
                >
                  <Image
                    width={width || 1000}
                    height={height}
                    objectFit="cover"
                    alt="新入生イベントアンケート"
                    src={advertise.mainImageUrl || '/images/top-image.png'}
                  />
                </a>
              </SwiperSlide>
            )
          })}
        </nav>
      </Swiper>
    </div>
  )
}

export { MainUucircleTopCarousel }
