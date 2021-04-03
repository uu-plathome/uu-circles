import { useMediaQuery } from '@/hooks/useMediaQuery'
import { __ } from '@/lang/ja'
import { Circle } from '@/lib/types/model/Circle'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { getDOW, getMonth, getDay, getFullJPDate } from '@/lib/utils/Date'
import { FC } from 'react'

const TableTitle: FC = ({ children }) => {
  return <h4 className="text-gray-500 text-base text-gray-400">{children}</h4>
}

type Props = {
  circle: Circle
  circleNewJoy: CircleNewJoy
}
const CircleNewJoyDetail: FC<Props> = ({ circle, circleNewJoy }) => {
  const { isMd } = useMediaQuery() //画面サイズによってレイアウト分けるため。

  return (
    <div>
      {isMd ? (
        // PCレイアウト
        <div
          className="bg-white rounded-lg px-6 py-2 mx-auto mb-2 flex justify-center"
          style={{ width: 500 }}
        >
          <div className="my-3 mr-6">
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
          </div>
          <div
            style={{
              width: 335,
            }}
          >
            <section className="my-3 border-b border-gray-600">
              <TableTitle>新歓イベント名</TableTitle>
              <p className="text-black text-sm  my-2 pb-2 font-bold">
                {circle.shortName || circle.name} {circleNewJoy.title}
              </p>
            </section>

            <section className="my-6 border-b border-gray-600">
              <TableTitle>新歓日時</TableTitle>
              <p className="text-black text-sm  my-2 pb-2 font-bold">
                {getFullJPDate(circleNewJoy.startDate, circleNewJoy.endDate)}
              </p>
            </section>

            <section className="my-6 border-b border-gray-600">
              <TableTitle>活動場所</TableTitle>
              <p className="text-black text-sm  my-2 pb-2 font-bold">
                {__(circleNewJoy.placeOfActivity)}
              </p>
            </section>

            {circleNewJoy.placeOfActivityDetail ? (
              <section className="my-6 border-b border-gray-600">
                <TableTitle>活動場所詳細</TableTitle>
                <p className="text-black text-sm my-2 pb-2 font-bold whitespace-pre-wrap">
                  {circleNewJoy.placeOfActivityDetail}
                </p>
              </section>
            ) : (
              ''
            )}

            {circleNewJoy.url ? (
              <section className="my-6 border-b border-gray-600">
                <TableTitle>URL</TableTitle>
                <p className="text-sm my-2 pb-2">
                  <a
                    className="text-blue-600 font-bold hover:underline"
                    href={circleNewJoy.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    リンクを見る
                  </a>
                </p>
              </section>
            ) : (
              ''
            )}

            <section className="my-6 border-b border-gray-600">
              <TableTitle>新歓説明</TableTitle>
              <p className="text-black text-sm my-2 pb-2 font-bold whitespace-pre-wrap">
                {circleNewJoy.description}
              </p>
            </section>
          </div>
        </div>
      ) : (
        // スマホレイアウト
        <div className="px-6">
          <div className=" bg-white rounded-lg px-6 py-2 mx-auto mb-2">
            <section className="my-6 border-b border-gray-600">
              <TableTitle>新歓イベント名</TableTitle>

              <p className="text-black text-sm  my-2 pb-2 font-bold">
                {circle.shortName || circle.name} {circleNewJoy.title}
              </p>
            </section>

            <section className="my-6 border-b border-gray-600">
              <TableTitle>新歓日時</TableTitle>

              <p className="text-black text-sm  my-2 pb-2 font-bold">
                {getFullJPDate(circleNewJoy.startDate, circleNewJoy.endDate)}
              </p>
            </section>

            <section className="my-6 border-b border-gray-600">
              <TableTitle>活動場所</TableTitle>

              <p className="text-black text-sm  my-2 pb-2 font-bold">
                {__(circleNewJoy.placeOfActivity)}
              </p>
            </section>

            {circleNewJoy.placeOfActivityDetail ? (
              <section className="my-6 border-b border-gray-600">
                <TableTitle>活動場所詳細</TableTitle>
                <p className="text-black text-sm  my-2 pb-2 font-bold whitespace-pre-wrap">
                  {circleNewJoy.placeOfActivityDetail}
                </p>
              </section>
            ) : (
              ''
            )}

            {circleNewJoy.url ? (
              <section className="my-6 border-b border-gray-600">
                <TableTitle>URL</TableTitle>
                <p className="text-sm my-2 pb-2">
                  <a
                    className="text-blue-600 font-bold hover:underline"
                    href={circleNewJoy.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    リンクを見る
                  </a>
                </p>
              </section>
            ) : (
              ''
            )}

            <section className="my-6 border-b border-gray-600">
              <TableTitle>新歓説明</TableTitle>

              <p className="text-black text-sm  my-2 pb-2 font-bold whitespace-pre-wrap">
                {circleNewJoy.description}
              </p>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}

export { CircleNewJoyDetail }
