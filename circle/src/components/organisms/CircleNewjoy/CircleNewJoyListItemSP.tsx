import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { FC } from 'react'
import colors from '@/colors'
import { __ } from '@/src/lang/ja'
import { PlaceOfActivity } from '@/src/lib/enum/api/PlaceOfActivity'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'
import { getDate, getTime } from '@/src/lib/utils/Date'

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
          className="flex justify-between items-center py-2 px-6 mx-auto mb-2 bg-white rounded-lg border border-gray-300"
          style={{ width: 320 }}
        >
          <div className="pr-3 w-full">
            <h2 className="mb-1 font-bold text-black">
              <FontAwesomeIcon
                icon={circleNewJoy.release ? faCheck : faTimes}
                color={
                  circleNewJoy.release ? colors.green[700] : colors.red[500]
                }
                className="mr-2"
              />
              {circleNewJoy.title}
            </h2>
            <p className="flex mb-1 text-sm border-b border-gray-400">
              <span className="pl-1 text-xs text-gray-400 whitespace-nowrap">
                場所
              </span>
              <span className="block w-full text-center">
                {__(circleNewJoy.placeOfActivity, PlaceOfActivity._type)}
              </span>
            </p>
            <div className="flex text-sm">
              <div
                className="mr-2 whitespace-nowrap border-b border-gray-400"
                style={{ width: 120 }}
              >
                <span className="pl-1 text-xs text-gray-400">日時</span>
                <span className="px-2">{getDate(circleNewJoy.startDate)}</span>
              </div>

              <span
                className="block w-full text-center whitespace-nowrap border-b border-gray-400"
                style={{ width: 90 }}
              >
                {getTime(circleNewJoy.startDate, circleNewJoy.endDate)}
              </span>
            </div>
          </div>
          <div className="mr-4">
            <div
              className="flex justify-center items-center text-xs text-white bg-blue-800 rounded-full cursor-pointer"
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
