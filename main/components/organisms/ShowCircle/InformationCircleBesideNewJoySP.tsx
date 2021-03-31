import { __ } from '@/lang/ja'
import { isCircleType } from '@/lib/enum/api/CircleType'
import { Circle } from '@/lib/types/model/Circle'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
type Props = {
  circle: Circle
}
//インポート時は下記をコピー
//import { InformationCircleBesideNewJoy } from '@/components/organisms/ShowCircle/InformationCircleBesideNewJoy'

const InformationCircleBesideNewJoySP: FC<Props> = ({ circle }) => {
  return (
    <div className="pb-16">
      <h2 className="font-bold text-lg md:text-center pl-4 mb-3">
        主催サークル
      </h2>
      <Link href="/circle/[slug]" as={`/circle/${circle.slug}`}>
        <a>
          <div
            className="border border-gray-300 bg-white rounded-lg flex justify-between items-center px-2 py-2 mx-auto mb-2"
            style={{ width: 300 }}
          >
            <div className="mr-2" style={{ width: 64 }}>
              <Image
                src={
                  circle.mainImageUrl
                    ? circle.mainImageUrl
                    : '/images/no-image.png'
                }
                alt={`${circle.name}のロゴ`}
                width={64}
                height={64}
                className="rounded-full border border-gray-300"
              />
            </div>

            <div className="w-full pr-2" style={{ width: 200 }}>
              <h3 className="text-black font-bold mb-1 text-sm">
                {circle.name}
              </h3>
              <div>
                <p className="text-xs text-gray-600 max-line-4">
                  {circle.description}
                </p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export { InformationCircleBesideNewJoySP }
