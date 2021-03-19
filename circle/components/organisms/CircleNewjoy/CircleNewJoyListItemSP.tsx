import { FC } from 'react'
import Link from 'next/link'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { __ } from '@/lang/ja'
import { getDate, getTime } from '@/lib/utils/Date'

type Props = {
  circleId: number
  circleNewJoy: CircleNewJoy
}
const CircleNewJoyListItemSP: FC<Props> = ({ circleId, circleNewJoy }) => {
  //日時、時間でwidth指定しているのは、時間が開始のみのときに画面崩れるのを防止するためです！！！！
  return (
    <Link
      href="/circle/[circleId]/newjoy/[circleNewJoyId]/edit"
      as={`/circle/${circleId}/newjoy/${circleNewJoy.id}/edit`}
    >
      <a>
        <div
          className="border border-gray-300 bg-white rounded-lg flex justify-between items-center px-6 py-2 mx-auto mb-2"
          style={{ width: 320 }}
        >
          <div className="w-full pr-3">
            <h3 className="text-black font-bold mb-1">{circleNewJoy.title}</h3>
            <p className="text-sm border-b border-gray-400 flex mb-1">
              <span className="text-gray-400 whitespace-nowrap text-xs pl-1">
                場所
              </span>
              <span className="block w-full text-center">
                {__(circleNewJoy.placeOfActivity)}
              </span>
            </p>
            <div className="text-sm flex">
              <div
                className="mr-2 border-b border-gray-400 whitespace-nowrap"
                style={{ width: 120 }}
              >
                <span className="text-gray-400 text-xs pl-1">日時</span>
                <span className="px-2">{getDate(circleNewJoy.startDate)}</span>
              </div>

              <span
                className="block w-full text-center border-b border-gray-400 whitespace-nowrap"
                style={{ width: 90 }}
              >
                {getTime(circleNewJoy.startDate, circleNewJoy.endDate)}
              </span>
            </div>
          </div>
          <div className="mr-4">
            <div
              className="text-white bg-blue-800 rounded-full text-xs flex items-center justify-center cursor-pointer"
              style={{ width: 52, height: 52 }}
            >
              詳細
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export { CircleNewJoyListItemSP }
