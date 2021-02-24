import { FC } from 'react'
import Link from 'next/link'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { __ } from '@/lang/ja'
import dayjs from 'dayjs'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Image from 'next/image'
import { TodayCircleNewJoy } from '@/infra/api/circleNewJoy'
const getDOW = (circleNewJoy: CircleNewJoy) => {
  //曜日取得関数 dayjs
  const date = dayjs(circleNewJoy.startDate)
  const DOWList = ['日', '月', '火', '水', '木', '金', '土'] //dayjsは日曜始まり
  const DOW = DOWList[date.day()]
  return DOW
}
const getMonth = (circleNewJoy: CircleNewJoy) => {
  if (circleNewJoy.startDate) {
    const date = dayjs(circleNewJoy.startDate)

    return date.format('M')
  }

  return '未定'
}
const getDay = (circleNewJoy: CircleNewJoy) => {
  if (circleNewJoy.startDate) {
    const date = dayjs(circleNewJoy.startDate)

    return date.format('D')
  }

  return '未定'
}
const getDate = (circleNewJoy: CircleNewJoy) => {
  if (circleNewJoy.startDate) {
    const date = dayjs(circleNewJoy.startDate)

    return date.format('YYYY/MM/DD')
  }

  return '未定'
}
const getTime = (circleNewJoy: CircleNewJoy) => {
  if (circleNewJoy.startDate && circleNewJoy.endDate) {
    const startDate = dayjs(circleNewJoy.startDate)
    const endDate = dayjs(circleNewJoy.endDate)

    return `${startDate.format('HH:mm')}-${endDate.format('HH:mm')}`
  }

  if (circleNewJoy.startDate) {
    const startDate = dayjs(circleNewJoy.startDate)

    return `${startDate.format('HH:mm')}-`
  }

  if (circleNewJoy.endDate) {
    const endDate = dayjs(circleNewJoy.endDate)

    return `-${endDate.format('HH:mm')}`
  }

  return '未定'
}
type Props = {
  todayCircleNewJoy: TodayCircleNewJoy
}
const CircleNewJoyListItemForNoSlug: FC<Props> = ({ todayCircleNewJoy }) => {
  const { isMd } = useMediaQuery() //画面サイズによってレイアウト分けるため。
  console.log(todayCircleNewJoy) //しょっちゅう使うため、コメントアウトしています。
  const circleNewJoy = todayCircleNewJoy.circleNewJoy
  const slug = todayCircleNewJoy.slug
  return (
    <div>
      {isMd ? (
        // PCレイアウト
        <div
          className="border border-4 border-gray-300 bg-white rounded-xl flex justify-between items-center px-6 py-2 mx-auto mb-2"
          style={{ width: 800, height: 100 }}
        >
          <section
            className="rounded-2xl border-gray-300 border border-gray-300"
            style={{
              width: 70,
              height: 70,
            }}
          >
            <div className="bg-gray-600 text-white  rounded-2xl rounded-b-none text-center ">
              <p className="text-xs leading-5">{getDOW(circleNewJoy)}</p>
            </div>
            <div
              className=" text-black  text-center rounded-2xl rounded-t-none  items-center pb-4"
              style={{ borderRadius: '0 0 10 10 ' }}
            >
              <p className="text-xs leading-4">{getMonth(circleNewJoy)}月</p>
              <p className="text-2xl">{getDay(circleNewJoy)}</p>
            </div>
          </section>
          <section className=" bg-white px-2 pl-3 w-80">
            <div className="col-span-4">
              <h2 className="font-bold text-xl text-center">
                {circleNewJoy.title}
              </h2>
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
                  {getTime(circleNewJoy)}
                </p>
              </div>
            </div>
          </section>
          <section className="h-full w-20" style={{ paddingTop: '50px' }}>
            <Link
              href="/circle/[slug]/newjoy/[circleNewJoy.id]"
              as={`/circle/${slug}/newjoy/${circleNewJoy.id}`}
            >
              <a className="text-blue-500 border-b border-blue-500 text-xs w-20">
                もっと詳しく
              </a>
            </Link>
          </section>

          <section
            className="border-l-2 border-gray-600 h-full pl-2"
            style={{ width: '270px' }}
          >
            <h3 className="text-xs  ">主催サークル</h3>
            <div className="pl-2 flex justify-around items-center">
              {todayCircleNewJoy.mainImageUrl == null ? (
                <div className="  w-12 h-12 flex items-center justify-center rounded-full">
                  <Image
                    src={'/images/no-image.png'}
                    alt={`${todayCircleNewJoy.name}のアイコン`}
                    className="mx-auto"
                    width={44}
                    height={44}
                  />
                </div>
              ) : (
                <div className="  w-12 h-12 flex items-center justify-center rounded-full">
                  <Image
                    src={todayCircleNewJoy.mainImageUrl}
                    alt={`${todayCircleNewJoy.name}のアイコン`}
                    class="mx-auto"
                    width={44}
                    height={44}
                  />
                </div>
              )}

              <div className="pl-2 mt-2" style={{ width: '280px' }}>
                <p className="text-sm ">{todayCircleNewJoy.circleType}</p>
                <Link href="/circle/[slug]" as={`/circle/${slug}`}>
                  <a className="inline text-xl border-b font-bold">
                    {todayCircleNewJoy.name}
                  </a>
                </Link>
              </div>
            </div>
          </section>
        </div>
      ) : (
        // スマホレイアウト
        <div
          className="border border-4 border-gray-300 bg-white rounded-lg flex justify-between items-center px-6 py-2 mx-auto mb-2"
          style={{ width: 320 }}
        >
          <div className=" pr-2">
            <h3 className="text-black font-bold mb-1">{circleNewJoy.title}</h3>
            <p className="text-sm border-b border-gray-400 flex mb-1">
              <span className="text-gray-400 whitespace-nowrap text-xs pl-1">
                場所
              </span>
              <span className="block  text-center">
                {__(circleNewJoy.placeOfActivity)}
              </span>
            </p>
            <div className="text-sm flex">
              <div className="mr-2 border-b border-gray-400 whitespace-nowrap">
                <span className="text-gray-400 text-xs pl-1">日時</span>
                <span className="px-2">{getDate(circleNewJoy)}</span>
              </div>

              <span className="block  text-center border-b border-gray-400 whitespace-nowrap">
                {getTime(circleNewJoy)}
              </span>
            </div>
          </div>
          <div className="mr-4">
            <Link
              href="/circle/[slug]/newjoy/[circleNewJoy]"
              as={`/circle/${slug}/newjoy/${circleNewJoy.id}`}
            >
              <div
                className="text-white bg-blue-800 rounded-full text-xs flex items-center justify-center"
                style={{ width: 52, height: 52 }}
              >
                詳細
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export { CircleNewJoyListItemForNoSlug }
