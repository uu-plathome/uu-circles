import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ComputedPagePositionIdNowLength } from '../../computedPagePositionIdNowLength'
import { TOP_BUTTONS_ID_LIST } from './top_buttons_id_list'
import { Utas } from '@/src/components/atoms/utas/Utas'
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

type PcButtonGroupProps = {
  pagePositionIdNowLength: ComputedPagePositionIdNowLength
  onChangeId: (id: string) => void
}
const PcButtonGroup: FC<PcButtonGroupProps> = ({
  pagePositionIdNowLength,
  onChangeId,
}) => {
  const pLen = pagePositionIdNowLength

  return (
    <nav className="flex">
      <div
        id={TOP_BUTTONS_ID_LIST.TOP_BUTTONS_TO_NEW_STUDENTS}
        className="mx-4 mb-4"
        onMouseOver={() =>
          onChangeId(TOP_BUTTONS_ID_LIST.TOP_BUTTONS_TO_NEW_STUDENTS)
        }
      >
        <div className="hidden md:block">
          {pLen[TOP_BUTTONS_ID_LIST.TOP_BUTTONS_TO_NEW_STUDENTS] > 0 ? (
            <Utas
              num={
                pLen[TOP_BUTTONS_ID_LIST.TOP_BUTTONS_TO_NEW_STUDENTS] > 5
                  ? 5
                  : pLen[TOP_BUTTONS_ID_LIST.TOP_BUTTONS_TO_NEW_STUDENTS]
              }
            />
          ) : (
            <div className="pt-8" />
          )}
        </div>

        <PcButton
          href="/guide/to-new-students"
          src="/images/topButtons/Rectangle15.png"
          alt="新入生へ"
        />
      </div>

      <div
        id={TOP_BUTTONS_ID_LIST.TOP_BUTTONS_NEW_JOY}
        className="mx-4 mb-4"
        onMouseOver={() => onChangeId(TOP_BUTTONS_ID_LIST.TOP_BUTTONS_NEW_JOY)}
      >
        <div className="hidden md:block">
          {pLen[TOP_BUTTONS_ID_LIST.TOP_BUTTONS_NEW_JOY] > 0 ? (
            <Utas
              num={
                pLen[TOP_BUTTONS_ID_LIST.TOP_BUTTONS_NEW_JOY] > 5
                  ? 5
                  : pLen[TOP_BUTTONS_ID_LIST.TOP_BUTTONS_NEW_JOY]
              }
            />
          ) : (
            <div className="pt-8" />
          )}
        </div>

        <PcButton
          href="/circle/newjoy"
          src="/images/topButtons/shinkan1.png"
          alt="今日の新歓"
        />
      </div>

      <div
        id={TOP_BUTTONS_ID_LIST.TOP_BUTTONS_DISCORD}
        className="mx-4 mb-4"
        onMouseOver={() => onChangeId(TOP_BUTTONS_ID_LIST.TOP_BUTTONS_DISCORD)}
      >
        <div className="hidden md:block">
          {pLen[TOP_BUTTONS_ID_LIST.TOP_BUTTONS_DISCORD] > 0 ? (
            <Utas
              num={
                pLen[TOP_BUTTONS_ID_LIST.TOP_BUTTONS_DISCORD] > 5
                  ? 5
                  : pLen[TOP_BUTTONS_ID_LIST.TOP_BUTTONS_DISCORD]
              }
            />
          ) : (
            <div className="pt-8" />
          )}
        </div>

        <PcButton
          href="/guide/discord"
          src="/images/online.png"
          alt="新歓ディスコード"
        />
      </div>
    </nav>
  )
}

type Props = {
  pagePositionIdNowLength: ComputedPagePositionIdNowLength
  onChangeId: (id: string) => void
}
const MainUucircleTopButtons: FC<Props> = ({
  pagePositionIdNowLength,
  onChangeId,
}) => {
  const { isLg } = useMediaQuery()

  return (
    <div className="flex justify-center pt-10 pb-10 bg-gray-100">
      {isLg ? (
        <PcButtonGroup
          pagePositionIdNowLength={pagePositionIdNowLength}
          onChangeId={onChangeId}
        />
      ) : (
        <SpButtonGroup />
      )}
    </div>
  )
}

export { MainUucircleTopButtons }
