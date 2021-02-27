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
  useEffect(() => {
    setHeight(isMd ? 330 : (width * 4192) / 8001)
  }, [isMd, width])

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
      <Swiper {...params}>
        <nav className="">
          <SwiperSlide className="w-full">
            <div style={{ width: width || 0, height: height }}>
              <Image
                layout="fill"
                objectFit="cover"
                src="/images/topCarousel/Rectangle16.png"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <div style={{ width: width || 0, height: height }}>
              <Image
                src="/images/top-image.png"
                layout="fill"
                objectFit="cover"
                alt="UU-circlesへようこそ！"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <div style={{ width: width || 0, height: height }}>
              <Image
                layout="fill"
                objectFit="cover"
                src="/images/topCarousel/Rectangle16.png"
              />
            </div>
          </SwiperSlide>
        </nav>
      </Swiper>
    </div>
  )
}

export { MainUucircleTopCarousel }
