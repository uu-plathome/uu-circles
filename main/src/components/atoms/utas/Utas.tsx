import Image from 'next/image'
import { FC } from 'react'
import { ImagePath } from '@/src/lib/enum/app/ImagePath'

type UtasProps = {
  num: number
  center?: boolean
}
const Utas: FC<UtasProps> = ({ num = 1, center }) => {
  return (
    <div
      className={`
      relative
      pt-0.5
      ${center ? 'text-center flex justify-center' : ''}
      `}
    >
      {Array(num)
        .fill(0)
        .map((_, i) => (
          <Uta
            key={i}
            center={center}
            left={`${i * 18}px`}
            top={`2px`}
            isFirst={i === 0}
          />
        ))}
    </div>
  )
}

type UtaProps = {
  isFirst: boolean
  center: boolean
  left: number | string
  top: number | string
}
const Uta: FC<UtaProps> = ({ isFirst, center, left, top }) => {
  return (
    <div className={isFirst || center ? '' : 'absolute'} style={{ left, top }}>
      <Image
        className="rounded-full"
        width="24"
        height="24"
        src={ImagePath.UU_CIRCLES.UTA_ICON.BLUE}
        alt="一人目"
      />
    </div>
  )
}

export { Utas }
