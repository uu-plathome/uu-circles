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

SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y])

const MainUucircleTopCarousel: FC = () => {
  const { isMd } = useMediaQuery()
  const { width } = useWindowResize()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setHeight(isMd ? 330 : (width * 4192) / 8001)
  }, [isMd, width])

  const params: Swiper = {
    //Swiperの設定
    initialSlide: 1,
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
            <a href="https://camp-fire.jp/projects/view/335734" target="_blank" rel="noopener">
              <Image
                width={width || 1000}
                height={height}
                objectFit="cover"
                src="/images/syschismo.png"
              />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/top-image.png"
              width={width || 1000}
              height={height}
              objectFit="cover"
              alt="UU-Circlesへようこそ！"
            />
          </SwiperSlide>
          <SwiperSlide>
            <a href="http://ulab-uu.com/" target="_blank" rel="noopener">
              <Image
                width={width || 1000}
                height={height}
                objectFit="cover"
                src="/images/topCarousel/Rectangle16.png"
              />
            </a>
          </SwiperSlide>
        </nav>
      </Swiper>
    </div>
  )
}

export { MainUucircleTopCarousel }
