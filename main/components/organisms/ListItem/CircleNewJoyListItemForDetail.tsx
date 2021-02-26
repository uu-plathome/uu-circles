import { FC } from 'react'
import Link from 'next/link'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { __ } from '@/lang/ja'
import dayjs from 'dayjs'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Image from 'next/image'
import { TodayCircleNewJoy } from '@/infra/api/circleNewJoy'
import { getDOW, getMonth, getDay, getDate, getTime } from '@/lib/utils/Date'
import { CircleType } from '@/lib/enum/api/CircleType'
type Props = {
  todayCircleNewJoy: TodayCircleNewJoy
}
const CircleNewJoyListItemForDetail: FC<Props> = ({ todayCircleNewJoy }) => {
  const { isMd } = useMediaQuery() //画面サイズによってレイアウト分けるため。
  // console.log(todayCircleNewJoy)
  const circleNewJoy = todayCircleNewJoy.circleNewJoy
  const slug = todayCircleNewJoy.slug

  return (
    <div>
      {isMd ? (
        // PCレイアウト
        <div
          className="border border-gray-300 bg-white rounded-xl flex justify-between px-6 py-2 mx-auto mb-2"
          style={{ width: 500, height: 448 }}
        >
          <section
            className="rounded-2xl border-gray-300 border"
            style={{
              width: 70,
              height: 70,
            }}
          >
            <div className="bg-gray-600 text-white  rounded-2xl rounded-b-none text-center ">
              <p className="text-xs leading-5">
                {getDOW(circleNewJoy.startDate)}
              </p>
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
          <section
            className=" bg-white px-2 pl-3 w-80"
            style={{ width: 335, height: 145 }}
          >
            <h4 className="text-gray-500 text-lg">新歓イベント名</h4>
            <h4 className="text-black text-xl border-b border-gray-600">
              テスト新歓
            </h4>
          </section>
        </div>
      ) : (
        // スマホレイアウト
        <div
          className="border border-gray-300 bg-white rounded-lg flex justify-between items-center px-6 py-2 mx-auto mb-2"
          style={{ width: 320 }}
        >
          <div className=" pr-2" style={{ minWidth: 230 }}>
            <h3 className="text-black font-bold mb-1">{circleNewJoy.title}</h3>
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
                <span className="px-2">{getDate(circleNewJoy)}</span>
              </div>

              <span
                className="block  text-center border-b border-gray-400 whitespace-nowrap"
                style={{ minWidth: 87 }}
              >
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

export { CircleNewJoyListItemForDetail }
