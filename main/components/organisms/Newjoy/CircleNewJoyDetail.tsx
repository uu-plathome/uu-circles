import { useMediaQuery } from '@/hooks/useMediaQuery'
import { __ } from '@/lang/ja'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { getDOW, getMonth, getDay, getFullJPDate } from '@/lib/utils/Date'
import { FC } from 'react'
type Props = {
  circleNewJoy: CircleNewJoy
}
const CircleNewJoyDetail: FC<Props> = ({ circleNewJoy }) => {
  const { isMd } = useMediaQuery() //画面サイズによってレイアウト分けるため。
  // console.log(circleNewJoy)

  return (
    <div>
      {isMd ? (
        // PCレイアウト
        <div
          className=" bg-white rounded-lg  px-6 py-2 mx-auto mb-2 flex justify-center"
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
            className=""
            style={{
              width: 335,
            }}
          >
            <section className="my-3 border-b border-gray-600">
              <h4 className="text-gray-500 text-base text-gray-400">
                新歓イベント名
              </h4>
              <h4 className="text-black text-sm  my-2 pb-2 font-bold">
                {circleNewJoy.title}
              </h4>
            </section>
            <section className="my-6 border-b border-gray-600">
              <h4 className="text-gray-500 text-base text-gray-400">
                新歓日時
              </h4>
              <h4 className="text-black text-sm  my-2 pb-2 font-bold">
                {getFullJPDate(circleNewJoy.startDate, circleNewJoy.endDate)}
              </h4>
            </section>
            <section className="my-6 border-b border-gray-600">
              <h4 className="text-gray-500 text-base text-gray-400">
                集合場所
              </h4>
              <h4 className="text-black text-sm  my-2 pb-2 font-bold">
                {__(circleNewJoy.placeOfActivity)}
              </h4>
            </section>
            <section className="my-6 ">
              <h4 className="text-gray-500 text-base text-gray-400">
                新歓説明
              </h4>
              <h4 className="text-black text-sm  my-2 pb-2 font-bold">
                {circleNewJoy.description}
              </h4>
            </section>
          </div>
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
              {getFullJPDate(circleNewJoy.startDate, circleNewJoy.endDate)}
            </h4>
          </section>
          <section className="my-6 border-b border-gray-600">
            <h4 className="text-gray-500 text-base text-gray-400">集合場所</h4>
            <h4 className="text-black text-sm  my-2 pb-2 font-bold">
              {__(circleNewJoy.placeOfActivity)}
            </h4>
          </section>
          <section className="my-6 ">
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
