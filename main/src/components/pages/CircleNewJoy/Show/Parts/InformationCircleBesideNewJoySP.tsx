import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Circle } from '@/src/lib/types/model/Circle'
type Props = {
  circle: Circle
}
//インポート時は下記をコピー
//import { InformationCircleBesideNewJoy } from '@/components/organisms/ShowCircle/InformationCircleBesideNewJoy'

const InformationCircleBesideNewJoySP: FC<Props> = ({ circle }) => {
  return (
    <div className="pb-16">
      <h2 className="mb-3 font-bold text-center">主催サークル</h2>
      <Link
        href="/circle/[slug]"
        as={`/circle/${circle.slug}`}
        prefetch={false}
      >
        <a>
          <div
            className="flex justify-between items-center p-2 mx-auto mb-2 bg-white rounded-lg border border-gray-300"
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

            <div className="pr-2 w-full" style={{ width: 200 }}>
              <h3 className="mb-1 text-sm font-bold text-black">
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
