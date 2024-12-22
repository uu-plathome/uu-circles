import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { __ } from '@/src/lang/ja'
import { CircleType } from '@/src/lib/enum/api/CircleType'
import { PlaceOfActivity } from '@/src/lib/enum/api/PlaceOfActivity'
import { TodayCircleNewJoy } from '@/src/lib/infra/api/circleNewJoy'
import {
  getDow,
  getMonth,
  getDay,
  getDate,
  getTime,
} from '@/src/lib/utils/Date'

/**
 * 新歓タイトル
 */
const computedCircleNewJoyTitle = (todayCircleNewJoy: TodayCircleNewJoy) =>
  `${todayCircleNewJoy.shortName || todayCircleNewJoy.name} ${
    todayCircleNewJoy.circleNewJoy.title
  }`

type GetCircleNameSizeRetVal = 'text-xl' | 'text-base' | 'text-sm' | 'text-xs'
export const getCircleNameSize = (
  circleShowName: string
): GetCircleNameSizeRetVal => {
  if (circleShowName.length <= 9) {
    return 'text-xl'
  } else if (circleShowName.length <= 11) {
    return 'text-base'
  } else if (circleShowName.length <= 13) {
    return 'text-sm'
  } else {
    return 'text-xs'
  }
}
const PcLayout: FC<{
  todayCircleNewJoy: TodayCircleNewJoy
}> = ({ todayCircleNewJoy }) => {
  const circleNewJoy = todayCircleNewJoy.circleNewJoy
  const slug = todayCircleNewJoy.slug
  // shortNameあればそれ使い、なければnameを使う→15文字超えるとキツいので15文字以上なら省略→文字数におおじてサイズ調節
  const circleShowNameRaw =
    todayCircleNewJoy.shortName || todayCircleNewJoy.name
  const circleShowName =
    circleShowNameRaw.length <= 15
      ? circleShowNameRaw
      : circleShowNameRaw.substr(0, 14) + '…'

  return (
    <div
      className="flex justify-between items-center py-2 px-6 mx-auto mb-2 bg-white rounded-xl border border-gray-300"
      style={{ width: 750, height: 100 }}
    >
      <section
        className="rounded-2xl border border-gray-300"
        style={{
          width: 70,
          height: 70,
        }}
      >
        <div className="text-center text-white bg-gray-600 rounded-2xl rounded-b-none ">
          <p className="text-xs leading-5">{getDow(circleNewJoy.startDate)}</p>
        </div>

        <div
          className="items-center pb-4 text-center text-black rounded-2xl rounded-t-none "
          style={{ borderRadius: '0 0 10 10 ' }}
        >
          <p className="text-xs leading-4">
            {getMonth(circleNewJoy.startDate)}月
          </p>
          <p className="text-2xl">{getDay(circleNewJoy.startDate)}</p>
        </div>
      </section>

      <section className="px-2 pl-3 w-80 bg-white">
        <div className="col-span-4">
          <h2 className="mb-1 font-bold text-center">
            {todayCircleNewJoy.circleNewJoy.title}
          </h2>

          <div className="grid grid-cols-8 border-b-2">
            <p className="col-span-1 text-xs text-gray-600">場所</p>
            <p className="col-span-6 text-xs text-center text-gray-600">
              {' '}
              {__(circleNewJoy.placeOfActivity, PlaceOfActivity._type)}
            </p>
          </div>
          <div className="grid grid-cols-8 border-b-2">
            <p className="col-span-1 text-xs text-gray-600">日時</p>
            <p className="col-span-6 text-xs text-center text-gray-600">
              {getTime(circleNewJoy.startDate, circleNewJoy.endDate)}
            </p>
          </div>
        </div>
      </section>

      <section
        className="mx-auto w-28 h-full text-center"
        style={{ paddingTop: '50px' }}
      >
        <Link
          href={'/circle/[slug]/newjoy/[circleNewJoy.id]'}
          as={`/circle/${slug}/newjoy/${circleNewJoy.id}`}
          prefetch={false}
        >
          <a className="w-20 text-xs text-blue-600 border-b border-blue-600 ">
            もっと詳しく
          </a>
        </Link>
      </section>

      <section
        className="pl-2 h-full border-l-2 border-gray-600"
        style={{ width: '250px' }}
      >
        <h3 className="text-xs">主催サークル</h3>

        <Link href="/circle/[slug]" as={`/circle/${slug}`} prefetch={false}>
          <a>
            <div className="flex justify-around items-center pl-2">
              <div className="flex justify-center items-center w-12 h-12 rounded-full">
                <Image
                  src={
                    todayCircleNewJoy.mainImageUrl
                      ? todayCircleNewJoy.mainImageUrl
                      : '/images/no-image.png'
                  }
                  alt={`${todayCircleNewJoy.name}のアイコン`}
                  className="mx-auto"
                  width={44}
                  height={44}
                />
              </div>

              <div className="pl-2 mt-2" style={{ width: '280px' }}>
                <p className="text-sm">
                  {__(todayCircleNewJoy.circleType, CircleType._type)}
                </p>

                <p className="inline font-bold border-b cursor-pointer">
                  <span className={getCircleNameSize(circleShowName)}>
                    {circleShowName}
                  </span>
                </p>
              </div>
            </div>
          </a>
        </Link>
      </section>
    </div>
  )
}

const SpLayout: FC<{
  todayCircleNewJoy: TodayCircleNewJoy
}> = ({ todayCircleNewJoy }) => {
  const circleNewJoy = todayCircleNewJoy.circleNewJoy
  const slug = todayCircleNewJoy.slug
  const title = computedCircleNewJoyTitle(todayCircleNewJoy)

  return (
    // スマホレイアウト
    <Link
      href={'/circle/[slug]/newjoy/[circleNewJoy.id]'}
      as={`/circle/${slug}/newjoy/${circleNewJoy.id}`}
      prefetch={false}
      passHref
    >
      <div
        className="flex justify-between items-center py-2 px-6 mx-auto mb-2 bg-white rounded-lg border border-gray-300"
        style={{ width: 320 }}
      >
        <div className="pr-2 " style={{ minWidth: 230 }}>
          <h3 className="mb-1 font-bold text-black">{title}</h3>

          <p className="flex mb-1 text-sm border-b border-gray-400">
            <span className="pl-1 text-xs text-gray-400 whitespace-nowrap">
              場所
            </span>
            <span className="block mx-auto text-center">
              {__(circleNewJoy.placeOfActivity, PlaceOfActivity._type)}
            </span>
          </p>

          <div className="flex text-sm">
            <div className="mr-2 whitespace-nowrap border-b border-gray-400">
              <span className="pl-1 text-xs text-gray-400">日時</span>
              <span className="px-2">{getDate(circleNewJoy.startDate)}</span>
            </div>

            <span
              className="block text-center whitespace-nowrap border-b border-gray-400"
              style={{ minWidth: 87 }}
            >
              {getTime(circleNewJoy.startDate, circleNewJoy.endDate)}
            </span>
          </div>
        </div>
        <div className="mr-4">
          <div
            className="flex justify-center items-center text-xs text-white bg-blue-800 rounded-full"
            style={{ width: 52, height: 52 }}
          >
            詳細
          </div>
        </div>
      </div>
    </Link>
  )
}

type Props = {
  todayCircleNewJoy: TodayCircleNewJoy
}
const CircleNewJoyListItemForNoSlug: FC<Props> = ({ todayCircleNewJoy }) => {
  return (
    <div>
      <div className="hidden md:block">
        <PcLayout todayCircleNewJoy={todayCircleNewJoy} />
      </div>

      <div className="md:hidden">
        <SpLayout todayCircleNewJoy={todayCircleNewJoy} />
      </div>
    </div>
  )
}

export { CircleNewJoyListItemForNoSlug }
