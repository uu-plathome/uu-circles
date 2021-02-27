import { __ } from '@/lang/ja'
import { isCircleType } from '@/lib/enum/api/CircleType'
import { Circle } from '@/lib/types/model/Circle'
import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
type Props = {
  circle: Circle
}
//インポート時は下記をコピー
//import { InformationCircleBesideNewJoy } from '@/components/organisms/ShowCircle/InformationCircleBesideNewJoy'

const InformationCircleBesideNewJoyPC: FC<Props> = ({ circle }) => {
  return (
    <div
      className="bg-white mt-3 rounded-xl px-2"
      style={{ width: 222, height: 324 }}
    >
      <div className="mx-auto text-center pb-3 pt-6">
        <Image
          src={
            circle.mainImageUrl ? circle.mainImageUrl : '/images/no-image.png'
          }
          alt={`${circle.name}のロゴ`}
          width={70}
          height={70}
          className="rounded-full border border-gray-300"
        />
      </div>
      <h4 className="text-base text-center">{circle.prefixName}</h4>
      <h3 className="text-xl text-center mt-3 mb-4">{circle.name}</h3>
      <p className="text-xs text-left mx-auto">{circle.description}</p>

      <nav className="text-right">
        <Link href="/circle/[slug]" as={`/circle/${circle.slug}`}>
          <a className="text-xs text-blue-500 underline">もっと詳しく</a>
        </Link>
      </nav>
      <nav className="text-center mt-8">
        <Link href="" as={''}>
          <a className="rounded-full text-white bg-green-500 text-center  px-3 py-2 text-base">
            新歓日程
          </a>
        </Link>
      </nav>
    </div>
  )
}

export { InformationCircleBesideNewJoyPC }
