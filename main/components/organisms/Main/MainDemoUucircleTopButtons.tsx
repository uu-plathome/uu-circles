import { useMediaQuery } from '@/hooks/useMediaQuery'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

type SpButtonProps = {
  href: string
  src: string
}
const SpButton: FC<SpButtonProps> = ({ href, src }) => {
  return (
    <div className="mx-auto" style={{ width: 280, height: 65 }}>
      <Link href={href}>
        <a
          className="text-gray-900 block shadow rounded"
          style={{ width: '100%', height: '100%' }}
        >
          <Image width="280" height="65" src={src} />
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
          />
        </SwiperSlide>

        <SwiperSlide>
          <SpButton
            href="/circle/newjoy"
            src="/images/topButtons/shinkan1.png"
          />
        </SwiperSlide>

        <SwiperSlide>
          <SpButton
            href="/guide/discord"
            src="/images/topButtons/discordBunner1.png"
          />
        </SwiperSlide>
      </nav>
    </Swiper>
  )
}

type PcButtonProps = {
  href: string
  src: string
}
const PcButton: FC<PcButtonProps> = ({ href, src }) => {
  return (
    <div className="mx-auto" style={{ width: 280, height: 65 }}>
      <Link href={href}>
        <a
          className="text-gray-900 block shadow rounded"
          style={{ width: '100%', height: '100%' }}
        >
          <Image width="280" height="65" src={src} />
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
        />
      </div>

      <div className="m-4">
        <PcButton href="/circle/newjoy/demo" src="/images/topButtons/shinkan1.png" />
      </div>

      <div className="m-4">
        <PcButton href="/guide/discord" src="/images/online.png" />
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
