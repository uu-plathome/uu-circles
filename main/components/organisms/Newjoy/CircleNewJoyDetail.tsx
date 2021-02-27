import { FC } from 'react'
import Link from 'next/link'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { __ } from '@/lang/ja'
import dayjs from 'dayjs'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Image from 'next/image'
import { TodayCircleNewJoy } from '@/infra/api/circleNewJoy'
import {
  getDOW,
  getMonth,
  getDay,
  getDate,
  getTime,
  getFullJPDate,
} from '@/lib/utils/Date'
import { CircleType } from '@/lib/enum/api/CircleType'
type Props = {
  circleNewJoy: CircleNewJoy
}
const CircleNewJoyDetail: FC<Props> = ({ circleNewJoy }) => {
  const { isMd } = useMediaQuery() //画面サイズによってレイアウト分けるため。
  // console.log(CircleNewJoy)

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
                {getDOW(circleNewJoy.start_date)}
              </p>
            </div>
            <div
              className=" text-black  text-center rounded-2xl rounded-t-none  items-center pb-4"
              style={{ borderRadius: '0 0 10 10 ' }}
            >
              <p className="text-xs leading-4">
                {getMonth(circleNewJoy.start_date)}月
              </p>
              <p className="text-2xl">{getDay(circleNewJoy.start_date)}</p>
            </div>
          </section>
          <section
            className=" bg-white px-2 pl-3 "
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
          className=" bg-white rounded-lg  px-6 py-2 mx-auto mb-2"
          style={{ width: 308 }}
        >
          <section className="my-6 border-b border-gray-600">
            <h4 className="text-gray-500 text-base text-gray-400">
              新歓イベント名
            </h4>
            <h4 className="text-black text-sm  my-2 pb-2 font-bold">
              {circleNewJoy.title}
            </h4>
          </section>
          <section className="my-6 border-b border-gray-600">
            <h4 className="text-gray-500 text-base text-gray-400">新歓日時</h4>
            <h4 className="text-black text-sm  my-2 pb-2 font-bold">
              {getFullJPDate(circleNewJoy.start_date, circleNewJoy.end_date)}
            </h4>
          </section>
          <section className="my-6 border-b border-gray-600">
            <h4 className="text-gray-500 text-base text-gray-400">集合場所</h4>
            <h4 className="text-black text-sm  my-2 pb-2 font-bold">
              {circleNewJoy.place_of_activity}
            </h4>
          </section>
          <section className="my-6 border-b border-gray-600">
            <h4 className="text-gray-500 text-base text-gray-400">新歓説明</h4>
            <h4 className="text-black text-sm  my-2 pb-2 font-bold">
              {circleNewJoy.description}
            </h4>
          </section>
        </div>
      )}
    </div>
  )
}

export { CircleNewJoyDetail }
