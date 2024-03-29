import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

type SpButtonProps = {
  href: string
  src: string
  alt: string
}
const SpButton: FC<SpButtonProps> = ({ href, src, alt }) => {
  return (
    <div className="mx-auto" style={{ width: 280, height: 65 }}>
      <Link href={href} passHref>
        <a
          className="block text-gray-900 rounded shadow"
          style={{ width: '100%', height: '100%' }}
        >
          <Image width="280" height="65" src={src} alt={alt} />
        </a>
      </Link>
    </div>
  )
}
const SpButtonGroup = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      initialSlide={1}
      navigation
      loop
    >
      <nav className="mx-4">
        <SwiperSlide>
          <SpButton
            href="/guide/to-new-students"
            src="/images/topButtons/Rectangle15.png"
            alt="新入生へ"
          />
        </SwiperSlide>

        <SwiperSlide>
          <SpButton
            href="/circle/newjoy"
            src="/images/topButtons/shinkan1.png"
            alt="今日の新歓"
          />
        </SwiperSlide>

        <SwiperSlide>
          <SpButton
            href="/guide/discord"
            src="/images/topButtons/discordBunner1.png"
            alt="新歓ディスコード"
          />
        </SwiperSlide>
      </nav>
    </Swiper>
  )
}

type PcButtonProps = {
  href: string
  src: string
  alt: string
}
const PcButton: FC<PcButtonProps> = ({ href, src, alt }) => {
  return (
    <div className="mx-auto" style={{ width: 280, height: 65 }}>
      <Link href={href}>
        <a
          className="block text-gray-900 rounded shadow"
          style={{ width: '100%', height: '100%' }}
        >
          <Image width="280" height="65" src={src} alt={alt} />
        </a>
      </Link>
    </div>
  )
}
const PcButtonGroup = () => {
  return (
    <nav className="flex">
      <div className="m-4">
        <PcButton
          href="/guide/to-new-students"
          src="/images/topButtons/Rectangle15.png"
          alt="新入生へ"
        />
      </div>

      <div className="m-4">
        <PcButton
          href="/circle/newjoy/demo"
          src="/images/topButtons/shinkan1.png"
          alt="今日の新歓"
        />
      </div>

      <div className="m-4">
        <PcButton
          href="/guide/discord"
          src="/images/online.png"
          alt="新歓ディスコード"
        />
      </div>
    </nav>
  )
}

type Props = Record<string, never>
const MainDemoUucircleTopButtons: FC<Props> = () => {
  const { isLg } = useMediaQuery()

  return (
    <div className="flex justify-center pt-10 pb-10 bg-gray-100">
      {isLg ? <PcButtonGroup /> : <SpButtonGroup />}
    </div>
  )
}

export { MainDemoUucircleTopButtons }
