import { Circle } from '@/lib/types/model/Circle'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
type Props = {
  circle: Circle
}
//インポート時は下記をコピー
//import { InformationCircleBesideNewJoy } from '@/components/organisms/ShowCircle/InformationCircleBesideNewJoy'

const InformationCircleBesideNewJoyPC: FC<Props> = ({ circle }) => {
  return (
    <div className="bg-white mt-3 rounded-xl px-3 pb-6 " style={{ width: 222 }}>
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
          <a className="text-xs text-blue-600 underline">もっと詳しく</a>
        </Link>
      </nav>
    </div>
  )
}

export { InformationCircleBesideNewJoyPC }
