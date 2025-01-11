import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { TOP_BUTTONS_ID_LIST } from './top_buttons_id_list'

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

const PcButtonGroup: FC = ({}) => {
  return (
    <nav className="flex">
      <div id={TOP_BUTTONS_ID_LIST.TOP_BUTTONS_NEW_JOY} className="mx-4 mb-4">
        <PcButton
          href="/circle/newjoy"
          src="/images/topButtons/shinkan1.png"
          alt="今日の新歓"
        />
      </div>

      <div
        id={TOP_BUTTONS_ID_LIST.TOP_BUTTONS_TO_NEW_STUDENTS}
        className="mx-4 mb-4"
      >
        <PcButton
          href="/guide/to-new-students"
          src="/images/topButtons/Rectangle15.png"
          alt="新入生へ"
        />
      </div>
    </nav>
  )
}

export { PcButtonGroup }
