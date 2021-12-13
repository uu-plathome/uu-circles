import Link from 'next/link'
import { FC } from 'react'
import { SnsList } from './SnsList'
import { EmailObfuscateSimpleText } from '@/src/components/atoms/Obfuscate/EmailObfuscateSimpleText'
import { __ } from '@/src/lang/ja'
import { CircleTagModel } from '@/src/lib/enum/api/CircleTagModel'
import { CircleType, isCircleType } from '@/src/lib/enum/api/CircleType'
import { PlaceOfActivity } from '@/src/lib/enum/api/PlaceOfActivity'
import { Circle } from '@/src/lib/types/model/Circle'

type Props = {
  circle: Circle
  circleTags: CircleTagModel[]
}
const InformationField: FC<Props> = ({ circle, circleTags }) => {
  return (
    <div>
      <h2 className="mb-6 text-lg text-center md:text-left">サークル詳細</h2>

      <div className="flex justify-center md:justify-start px-6 md:px-0">
        <div className="py-8 px-6 md:w-full bg-white rounded">
          <div className="pb-4 border-b border-gray-400">
            <p className="mb-2 text-sm text-gray-400">団体・サークル名</p>
            {circle.prefixName ? (
              <p className="text-xs text-black">
                <span className="mr-4">{circle.prefixName}</span>
              </p>
            ) : (
              ''
            )}
            <p className="text-sm text-black">{circle.name}</p>
          </div>

          {circle.nameKana ? (
            <div className="py-4 border-b border-gray-400">
              <p className="mb-2 text-sm text-gray-400">
                団体・サークル名(カナ)
              </p>
              <p className="text-sm text-black whitespace-pre-wrap">
                {circle.nameKana}
              </p>
            </div>
          ) : (
            ''
          )}

          {circle.description ? (
            <div className="py-4 border-b border-gray-400">
              <p className="mb-2 text-sm text-gray-400">サークル紹介文</p>
              <p className="text-sm text-black whitespace-pre-wrap">
                {circle.description}
              </p>
            </div>
          ) : (
            ''
          )}

          {circle.circleType && isCircleType(circle.circleType) ? (
            <div className="py-4 border-b border-gray-400">
              <p className="mb-2 text-sm text-gray-400">サークル種別</p>
              <p className="text-sm text-black">
                {__(circle.circleType, CircleType._type)}
              </p>
            </div>
          ) : (
            ''
          )}

          {circle.admissionFeePerYear &&
            Number(circle.admissionFeePerYear) > 0 ? (
            <div className="py-4 border-b border-gray-400">
              <p className="mb-2 text-sm text-gray-400">年間費用</p>
              <p className="text-sm text-black">
                {Number(circle.admissionFeePerYear).toLocaleString()}円/年
              </p>
            </div>
          ) : (
            ''
          )}

          {circle.numberOfMembers > 0 ? (
            <div className="py-4 border-b border-gray-400">
              <p className="mb-2 text-sm text-gray-400">活動人数</p>
              <p className="text-sm text-black">{circle.numberOfMembers}人</p>
            </div>
          ) : (
            ''
          )}

          {circle.publicEmail ? (
            <div className="py-4 border-b border-gray-400">
              <p className="mb-2 text-sm text-gray-400">連絡用メールアドレス</p>
              <p className="text-sm text-black">
                <EmailObfuscateSimpleText email={circle.publicEmail} />
              </p>
            </div>
          ) : (
            ''
          )}

          <div className="py-4 border-b border-gray-400">
            <p className="mb-2 text-sm text-gray-400">通常活動場所</p>
            <p className="text-sm text-black">
              {__(circle.commonPlaceOfActivity, PlaceOfActivity._type) ||
                __(PlaceOfActivity.OTHER, PlaceOfActivity._type)}
            </p>
          </div>

          {circle.commonPlaceOfActivityDetail ? (
            <div className="py-4 border-b border-gray-400">
              <p className="mb-2 text-sm text-gray-400">通常活動場所詳細</p>
              <p className="text-sm text-black whitespace-pre-wrap">
                {circle.commonPlaceOfActivityDetail}
              </p>
            </div>
          ) : (
            ''
          )}

          {circle.commonDateOfActivityMonday ||
            circle.commonDateOfActivityTuesday ||
            circle.commonDateOfActivityWednesday ||
            circle.commonDateOfActivityThursday ||
            circle.commonDateOfActivityFriday ||
            circle.commonDateOfActivitySunday ||
            circle.commonDateOfActivitySunday ? (
            <div className="py-4 border-b border-gray-400">
              <p className="mb-2 text-sm text-gray-400">通常活動日</p>
              <div className="flex flex-wrap">
                <div className="mb-2 w-1/2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.commonDateOfActivityMonday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                      }`}
                  >
                    月曜日
                  </p>
                </div>
                <div className="mb-2 w-1/2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.commonDateOfActivityTuesday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                      }`}
                  >
                    火曜日
                  </p>
                </div>
                <div className="mb-2 w-1/2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.commonDateOfActivityWednesday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                      }`}
                  >
                    水曜日
                  </p>
                </div>
                <div className="mb-2 w-1/2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.commonDateOfActivityThursday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                      }`}
                  >
                    木曜日
                  </p>
                </div>
                <div className="mb-2 w-1/2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.commonDateOfActivityFriday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                      }`}
                  >
                    金曜日
                  </p>
                </div>
                <div className="mb-2 w-1/2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.commonDateOfActivitySaturday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                      }`}
                  >
                    土曜日
                  </p>
                </div>
                <div className="mb-2 w-1/2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.commonDateOfActivitySunday
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
            <div className="py-4 border-b border-gray-400">
              <p className="mb-2 text-sm text-gray-400">通常活動日</p>
              <p className="text-sm text-black whitespace-pre-wrap">不定期</p>
            </div>
          )}

          {circle.commonDateOfActivityDetail ? (
            <div className="py-4 border-b border-gray-400">
              <p className="mb-2 text-sm text-gray-400">通常活動日時詳細</p>
              <p className="text-sm text-black whitespace-pre-wrap">
                {circle.commonDateOfActivityDetail}
              </p>
            </div>
          ) : (
            ''
          )}

          <div className="py-4 border-b border-gray-400">
            <p className="mb-2 text-sm text-gray-400">オンライン活動</p>
            <p className="text-sm text-black">
              {circle.isOnlineActivity ? '行う' : '行わない'}
            </p>
          </div>

          {circle.isOnlineActivity && circle.onlineDateOfActivityDetail ? (
            <div className="py-4 border-b border-gray-400">
              <p className="mb-2 text-sm text-gray-400">オンライン活動場所</p>
              <p className="text-sm text-black whitespace-pre-wrap">
                {circle.onlineDateOfActivityDetail}
              </p>
            </div>
          ) : (
            ''
          )}

          {circle.isOnlineActivity &&
            (circle.onlineDateOfActivityMonday ||
              circle.onlineDateOfActivityTuesday ||
              circle.onlineDateOfActivityWednesday ||
              circle.onlineDateOfActivityThursday ||
              circle.onlineDateOfActivityFriday ||
              circle.onlineDateOfActivitySunday ||
              circle.onlineDateOfActivitySunday) ? (
            <div className="py-4 border-b border-gray-400">
              <p className="mb-2 text-sm text-gray-400">オンライン活動日</p>
              <div className="flex flex-wrap">
                <div className="mb-2 w-1/2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.onlineDateOfActivityMonday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                      }`}
                  >
                    月曜日
                  </p>
                </div>
                <div className="mb-2 w-1/2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.onlineDateOfActivityTuesday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                      }`}
                  >
                    火曜日
                  </p>
                </div>
                <div className="mb-2 w-1/2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.onlineDateOfActivityWednesday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                      }`}
                  >
                    水曜日
                  </p>
                </div>
                <div className="mb-2 w-1/2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.onlineDateOfActivityThursday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                      }`}
                  >
                    木曜日
                  </p>
                </div>
                <div className="mb-2 w-1/2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.onlineDateOfActivityFriday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                      }`}
                  >
                    金曜日
                  </p>
                </div>
                <div className="mb-2 w-1/2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.onlineDateOfActivitySaturday
                      ? 'bg-yellow-300'
                      : 'bg-gray-300'
                      }`}
                  >
                    土曜日
                  </p>
                </div>
                <div className="mb-2 w-1/2">
                  <p
                    className={`w-1/2 p-2 text-sm rounded text-center text-white ${circle.onlineDateOfActivitySunday
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
            <div className="py-4 border-b border-gray-400">
              <p className="mb-2 text-sm text-gray-400">オンライン活動日</p>
              <p className="text-sm text-black whitespace-pre-wrap">不定期</p>
            </div>
          )}

          {circle.participationUrl ? (
            <div className="py-4 border-b border-gray-400">
              <p className="mb-2 text-sm text-gray-400">新歓・活動参加用URL</p>
              <div>
                <a
                  className="text-blue-600 underline"
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
            <p className="mb-2 text-sm text-gray-400">各種SNS</p>
            <div>
              <SnsList circle={circle} />
            </div>
          </div>

          {circleTags && circleTags.length > 0 ? (
            <div className="py-4 border-t border-gray-400">
              <p className="mb-2 text-sm text-gray-400">タグ</p>
              <div className="grid grid-cols-2 gap-1">
                {circleTags.map((circleTag) => {
                  return (
                    <Link
                      key={`circleTag-${circleTag}`}
                      href={`/circle/tag/[tag]`}
                      as={`/circle/tag/${circleTag.toLocaleLowerCase()}`}
                    >
                      <a className="text-sm text-gray-400 hover:underline before:content-['#']">
                        {__(circleTag, CircleTagModel._type)}
                      </a>
                    </Link>
                  )
                })}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export { InformationField }
