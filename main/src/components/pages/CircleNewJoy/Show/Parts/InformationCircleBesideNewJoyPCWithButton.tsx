import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Circle } from '@/src/lib/types/model/Circle'

type Props = {
  circle: Circle
}
const InformationCircleBesideNewJoyPCWithButton: FC<Props> = ({ circle }) => {
  return (
    <div className="px-3 pb-6 mt-3 bg-white rounded-xl " style={{ width: 222 }}>
      <div className="pt-6 pb-3 mx-auto text-center">
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
      <h3 className="mt-3 mb-4 text-xl text-center">{circle.name}</h3>
      <p className="mx-auto text-xs text-left whitespace-pre-wrap">
        {circle.description}
      </p>

      <nav className="text-right">
        <Link
          href="/circle/[slug]"
          as={`/circle/${circle.slug}`}
          prefetch={false}
        >
          <a className="text-xs text-blue-600 underline">もっと詳しく</a>
        </Link>
      </nav>
      <div className="mt-4">
        <nav className="text-center ">
          <Link
            href="/circle/[slug]/newjoy"
            as={`/circle/${circle.slug}/newjoy/`}
          >
            <a className="py-2 px-3 text-base text-center text-white bg-green-500 rounded-full">
              新歓日程
            </a>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export { InformationCircleBesideNewJoyPCWithButton }
