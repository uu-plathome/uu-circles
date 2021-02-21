import { FC } from 'react'
import Link from 'next/link'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { __ } from '@/lang/ja'
import dayjs from 'dayjs'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Image from 'next/image'
const getDOW = (circleNewJoy: CircleNewJoy) => {
  //曜日取得関数 dayjs
  const date = dayjs(circleNewJoy.startDate)
  const DOWList = ['月', '火', '水', '木', '金', '土', '日']
  const DOW = DOWList[date.day()]
  return DOW
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
  circleNewJoy: CircleNewJoy
}
const CircleNewJoyListItemForNoSlug: FC<Props> = ({ circleNewJoy }) => {
  const { isMd } = useMediaQuery() //画面サイズによってレイアウト分けるため。
  circleNewJoy = circleNewJoy.circleNewJoy
  let slug = circleNewJoy.slug
  return (
    <div>
      {isMd ? (
        // PCレイアウト
        <div
          className="border border-4 border-gray-300 bg-white rounded-xl grid grid-cols-16 px-6 py-2 mx-auto mb-2"
          style={{ width: 750, height: 100 }}
        >
          <div
            className="col-span-1 rounded-2xl border-gray-300 border border-gray-300"
            style={
              {
                // width: 53,
                // height: 38,
              }
            }
          >
            <div className="bg-gray-600 text-white  rounded-2xl rounded-b-none text-center">
              <p>土</p>
            </div>
            <div
              className=" text-black  text-center rounded-2xl rounded-t-none  items-center"
              style={{ borderRadius: '0 0 10 10 ' }}
            >
              <p className="text-sm">4月</p>
              <p className="text-2xl">12</p>
            </div>
          </div>
          <section className=" grid grid-cols-5 mx-3 bg-white px-2 py-2 ">
            <div className="col-span-4">
              <h2 className="font-bold text-xl">{circleNewJoy.title}</h2>
              <div className="border-b-2  grid grid-cols-8">
                <p className="text-gray-600 text-xs col-span-1">場所</p>
                <p className="text-gray-600 text-xs col-span-6 text-center">
                  {' '}
                  {__(circleNewJoy.placeOfActivity)}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <div className="border-b-2  grid grid-cols-8">
                  <p className="text-gray-600 text-xs col-span-2 mr-1">日時</p>
                  <p className="text-gray-600 text-xs col-span-6 text-center">
                    {getDate(circleNewJoy)}
                  </p>
                </div>
                <div className="border-b-2  grid grid-cols-8 ml-1">
                  <p className="text-gray-600 text-xs col-span-2"></p>
                  <p className="text-gray-600 text-xs col-span-6 text-center">
                    {getTime(circleNewJoy)}
                  </p>
                </div>
              </div>
            </div>
            <div className=" flex justify-around items-end">
              <Link href="">
                <a className="text-blue-500 border-b border-blue-500 text-sm w-24">
                  もっと詳しく
                </a>
              </Link>
            </div>
          </section>

          <div className="col-span-4 border-l-2 border-black h-90">
            <h3 className="text-sm">主催サークル</h3>
            <div className="flex justify-around items-center">
              <div className="w-24 h-24 flex items-center justify-center rounded-full">
                <p className=" bg-blue-600 text-white">サークルのアイコン</p>
              </div>
              {/* <Image
              // src={circle.handbillImageUrl}
              // alt={`${circle.name}のアイコン`}
              // width={width}
              // height={height}
              /> */}
              <div>
                <p className="text-sm">宇都宮大学　デザインラボ</p>
                <p className="text-lg border-b font-bold">U-lab</p>
              </div>
            </div>
          </div>
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
