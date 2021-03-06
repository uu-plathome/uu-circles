import { FC } from 'react'
import Link from 'next/link'
import { __ } from '@/lang/ja'
import Image from 'next/image'
import { TodayCircleNewJoy } from '@/infra/api/circleNewJoy'
import { getDOW, getMonth, getDay, getDate, getTime } from '@/lib/utils/Date'

/**
 * 新歓タイトル
 */
const computedCircleNewJoyTitle = (todayCircleNewJoy: TodayCircleNewJoy) =>
  `${todayCircleNewJoy.shortName || todayCircleNewJoy.name} ${
    todayCircleNewJoy.circleNewJoy.title
  }`
export const getCircleNameSize = (circleShowName: string) => {
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
  const title = computedCircleNewJoyTitle(todayCircleNewJoy)
  //shortNameあればそれ使い、なければnmaeを使う→15文字超えるとキツいので15文字以上なら省略→文字数におおじてサイズ調節
  const circleShowNameRaw =
    todayCircleNewJoy.shortName || todayCircleNewJoy.name
  const circleShowName =
    circleShowNameRaw.length <= 15
      ? circleShowNameRaw
      : circleShowNameRaw.substr(0, 14) + '…'
  return (
    <div
      className="border border-gray-300 bg-white rounded-xl flex justify-between items-center px-6 py-2 mx-auto mb-2"
      style={{ width: 750, height: 100 }}
    >
      <section
        className="rounded-2xl border-gray-300 border"
        style={{
          width: 70,
          height: 70,
        }}
      >
        <div className="bg-gray-600 text-white  rounded-2xl rounded-b-none text-center ">
          <p className="text-xs leading-5">{getDOW(circleNewJoy.startDate)}</p>
        </div>
        <div
          className=" text-black  text-center rounded-2xl rounded-t-none  items-center pb-4"
          style={{ borderRadius: '0 0 10 10 ' }}
        >
          <p className="text-xs leading-4">
            {getMonth(circleNewJoy.startDate)}月
          </p>
          <p className="text-2xl">{getDay(circleNewJoy.startDate)}</p>
        </div>
      </section>
      <section className="bg-white px-2 pl-3 w-80">
        <div className="col-span-4">
          <h2 className="font-bold text-xl text-center">{title}</h2>
          <div className="border-b-2  grid grid-cols-8">
            <p className="text-gray-600 text-xs col-span-1">場所</p>
            <p className="text-gray-600 text-xs col-span-6 text-center">
              {' '}
              {__(circleNewJoy.placeOfActivity)}
            </p>
          </div>
          <div className="border-b-2  grid grid-cols-8">
            <p className="text-gray-600 text-xs col-span-1">日時</p>
            <p className="text-gray-600 text-xs col-span-6 text-center">
              {getTime(circleNewJoy.startDate, circleNewJoy.endDate)}
            </p>
          </div>
        </div>
      </section>
      <section
        className="h-full w-28 text-center mx-auto"
        style={{ paddingTop: '50px' }}
      >
        <Link
          href="/circle/[slug]/newjoy/[circleNewJoy.id]"
          as={`/circle/${slug}/newjoy/${circleNewJoy.id}`}
        >
          <a className="text-blue-600 border-b border-blue-600 text-xs w-20 ">
            もっと詳しく
          </a>
        </Link>
      </section>

      <section
        className="border-l-2 border-gray-600 h-full pl-2"
        style={{ width: '250px' }}
      >
        <h3 className="text-xs">主催サークル</h3>
        <Link href="/circle/[slug]" as={`/circle/${slug}`}>
          <div className="pl-2 flex justify-around items-center">
            <div className="  w-12 h-12 flex items-center justify-center rounded-full">
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
              <p className="text-sm">{__(todayCircleNewJoy.circleType)}</p>

              <a className="inline  border-b font-bold">
                <span className={getCircleNameSize(circleShowName)}>
                  {circleShowName}
                </span>
              </a>
            </div>
          </div>
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
      href="/circle/[slug]/newjoy/[circleNewJoy]"
      as={`/circle/${slug}/newjoy/${circleNewJoy.id}`}
    >
      <div
        className="border border-gray-300 bg-white rounded-lg flex justify-between items-center px-6 py-2 mx-auto mb-2"
        style={{ width: 320 }}
      >
        <div className=" pr-2" style={{ minWidth: 230 }}>
          <h3 className="text-black font-bold mb-1">{title}</h3>
          <p className="text-sm border-b border-gray-400 flex mb-1">
            <span className="text-gray-400 whitespace-nowrap text-xs pl-1">
              場所
            </span>
            <span className="block  text-center mx-auto">
              {__(circleNewJoy.placeOfActivity)}
            </span>
          </p>
          <div className="text-sm flex">
            <div className="mr-2 border-b border-gray-400 whitespace-nowrap">
              <span className="text-gray-400 text-xs pl-1">日時</span>
              <span className="px-2">{getDate(circleNewJoy.startDate)}</span>
            </div>

            <span
              className="block  text-center border-b border-gray-400 whitespace-nowrap"
              style={{ minWidth: 87 }}
            >
              {getTime(circleNewJoy.startDate, circleNewJoy.endDate)}
            </span>
          </div>
        </div>
        <div className="mr-4">
          <div
            className="text-white bg-blue-800 rounded-full text-xs flex items-center justify-center"
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
  // console.log(todayCircleNewJoy) //しょっちゅう使うため、コメントアウトしています。

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
