import { __ } from '@/lang/ja'
import { isCircleType } from '@/lib/enum/api/CircleType'
import { PlaceOfActivity } from '@/lib/enum/api/PlaceOfActivity'
import { Circle } from '@/lib/types/model/Circle'
import { FC } from 'react'
import { SnsList } from './SnsList'

type Props = {
  circle: Circle
}
const InformationField: FC<Props> = ({ circle }) => {
  return (
    <div>
      <h2 className="text-lg text-center mb-6 md:text-left">サークル詳細</h2>

      <div className="flex justify-center md:justify-start px-6 md:px-0">
        <div className="bg-white rounded md:w-full px-6 py-8">
          <div className="border-b border-gray-400 pb-4">
            <p className="text-sm text-gray-400 mb-2">団体・サークル名</p>
            <p className="text-sm text-black">
              {circle.prefixName ? (
                <span className="mr-4">{circle.prefixName}</span>
              ) : (
                ''
              )}
              {circle.name}
            </p>
          </div>

          {circle.description ? (
            <div className="border-b border-gray-400 py-4">
              <p className="text-sm text-gray-400 mb-2">サークル紹介文</p>
              <p className="text-sm text-black whitespace-pre-wrap">
                {circle.description}
              </p>
            </div>
          ) : (
            ''
          )}

          {circle.circleType && isCircleType(circle.circleType) ? (
            <div className="border-b border-gray-400 py-4">
              <p className="text-sm text-gray-400 mb-2">サークル種別</p>
              <p className="text-sm text-black">{__(circle.circleType)}</p>
            </div>
          ) : (
            ''
          )}

          {circle.admissionFeePerYear &&
          Number(circle.admissionFeePerYear) > 0 ? (
            <div className="border-b border-gray-400 py-4">
              <p className="text-sm text-gray-400 mb-2">年間費用</p>
              <p className="text-sm text-black">
                {Number(circle.admissionFeePerYear).toLocaleString()}円/年
              </p>
            </div>
          ) : (
            ''
          )}

          {circle.numberOfMembers > 0 ? (
            <div className="border-b border-gray-400 py-4">
              <p className="text-sm text-gray-400 mb-2">活動人数</p>
              <p className="text-sm text-black">{circle.numberOfMembers}人</p>
            </div>
          ) : (
            ''
          )}

          {circle.publicEmail ? (
            <div className="border-b border-gray-400 py-4">
              <p className="text-sm text-gray-400 mb-2">連絡用メールアドレス</p>
              <p className="text-sm text-black">{circle.publicEmail}</p>
            </div>
          ) : (
            ''
          )}

          <div className="border-b border-gray-400 py-4">
            <p className="text-sm text-gray-400 mb-2">通常活動場所</p>
            <p className="text-sm text-black">
              {__(circle.commonPlaceOfActivity) || __(PlaceOfActivity.OTHER)}
            </p>
          </div>

          {circle.commonPlaceOfActivityDetail ? (
            <div className="border-b border-gray-400 py-4">
              <p className="text-sm text-gray-400 mb-2">通常活動場所詳細</p>
              <p className="text-sm text-black whitespace-pre-wrap">
                {circle.commonPlaceOfActivityDetail}
              </p>
            </div>
          ) : ''}

          <div className="border-b border-gray-400 py-4">
            <p className="text-sm text-gray-400 mb-2">通常活動日</p>
            <div className="flex flex-wrap">
              <div className="w-1/2 mb-2">
                <p
                  className={`w-1/2 p-2 text-sm rounded text-center text-white ${
                    circle.commonDateOfActivityMonday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                  }`}
                >
                  月曜日
                </p>
              </div>
              <div className="w-1/2 mb-2">
                <p
                  className={`w-1/2 p-2 text-sm rounded text-center text-white ${
                    circle.commonDateOfActivityTuesday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                  }`}
                >
                  火曜日
                </p>
              </div>
              <div className="w-1/2 mb-2">
                <p
                  className={`w-1/2 p-2 text-sm rounded text-center text-white ${
                    circle.commonDateOfActivityWednesday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                  }`}
                >
                  水曜日
                </p>
              </div>
              <div className="w-1/2 mb-2">
                <p
                  className={`w-1/2 p-2 text-sm rounded text-center text-white ${
                    circle.commonDateOfActivityThursday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                  }`}
                >
                  木曜日
                </p>
              </div>
              <div className="w-1/2 mb-2">
                <p
                  className={`w-1/2 p-2 text-sm rounded text-center text-white ${
                    circle.commonDateOfActivityFriday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                  }`}
                >
                  金曜日
                </p>
              </div>
              <div className="w-1/2 mb-2">
                <p
                  className={`w-1/2 p-2 text-sm rounded text-center text-white ${
                    circle.commonDateOfActivitySaturday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                  }`}
                >
                  土曜日
                </p>
              </div>
              <div className="w-1/2 mb-2">
                <p
                  className={`w-1/2 p-2 text-sm rounded text-center text-white ${
                    circle.commonDateOfActivitySunday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                  }`}
                >
                  日曜日
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-400 py-4">
            <p className="text-sm text-gray-400 mb-2">オンライン活動</p>
            <p className="text-sm text-black">
              {circle.isOnlineActivity ? '行う' : '行わない'}
            </p>
          </div>

          {circle.isOnlineActivity && circle.onlineDateOfActivityDetail ? (
            <div className="border-b border-gray-400 py-4">
              <p className="text-sm text-gray-400 mb-2">オンライン活動場所</p>
              <p className="text-sm text-black whitespace-pre-wrap">
                {circle.onlineDateOfActivityDetail}
              </p>
            </div>
          ) : (
            ''
          )}

          {circle.isOnlineActivity ? (
            <div className="border-b border-gray-400 py-4">
              <p className="text-sm text-gray-400 mb-2">オンライン活動日</p>
              <div className="flex flex-wrap">
                <div className="w-1/2 mb-2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${
                      circle.onlineDateOfActivityMonday
                        ? 'bg-yellow-300'
                        : 'bg-gray-300'
                    }`}
                  >
                    月曜日
                  </p>
                </div>
                <div className="w-1/2 mb-2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${
                      circle.onlineDateOfActivityTuesday
                        ? 'bg-yellow-300'
                        : 'bg-gray-300'
                    }`}
                  >
                    火曜日
                  </p>
                </div>
                <div className="w-1/2 mb-2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${
                      circle.onlineDateOfActivityWednesday
                        ? 'bg-yellow-300'
                        : 'bg-gray-300'
                    }`}
                  >
                    水曜日
                  </p>
                </div>
                <div className="w-1/2 mb-2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${
                      circle.onlineDateOfActivityThursday
                        ? 'bg-yellow-300'
                        : 'bg-gray-300'
                    }`}
                  >
                    木曜日
                  </p>
                </div>
                <div className="w-1/2 mb-2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${
                      circle.onlineDateOfActivityFriday
                        ? 'bg-yellow-300'
                        : 'bg-gray-300'
                    }`}
                  >
                    金曜日
                  </p>
                </div>
                <div className="w-1/2 mb-2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${
                      circle.onlineDateOfActivitySaturday
                        ? 'bg-yellow-300'
                        : 'bg-gray-300'
                    }`}
                  >
                    土曜日
                  </p>
                </div>
                <div className="w-1/2 mb-2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${
                      circle.onlineDateOfActivitySunday
                        ? 'bg-yellow-300'
                        : 'bg-gray-300'
                    }`}
                  >
                    日曜日
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}

          {circle.participationUrl ? (
            <div className="py-4 border-b border-gray-400">
              <p className="text-sm text-gray-400 mb-2">新歓・活動参加用URL</p>
              <div>
                <a
                  className="text-blue-500 underline"
                  href={circle.participationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  URLはこちらから
                </a>
              </div>
            </div>
          ) : (
            ''
          )}

          <div className="py-4">
            <p className="text-sm text-gray-400 mb-2">各種SNS</p>
            <div>
              <SnsList circle={circle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { InformationField }
