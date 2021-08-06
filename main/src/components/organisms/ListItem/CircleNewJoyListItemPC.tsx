import { __ } from '@/src/lang/ja'
import { PlaceOfActivity } from '@/src/lib/enum/api/PlaceOfActivity'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'
import { getDOW, getMonth, getDay, getTime } from '@/src/lib/utils/Date'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  slug: string
  circleNewJoy: CircleNewJoy
}
const CircleNewJoyListItemPC: FC<Props> = ({ slug, circleNewJoy }) => {
  return (
    <div
      className="border border-gray-300 bg-white rounded-xl flex justify-between items-center px-6 py-2 mx-auto mb-2"
      style={{ width: 500, height: 100 }}
    >
      <section
        className="rounded-2xl border-gray-300 border"
        style={{
          width: 70,
          height: 70,
        }}
      >
        <div className="bg-gray-600 text-white  rounded-2xl rounded-b-none text-center ">
          <p className="text-xs leading-5">{getDOW(circleNewJoy.startDate)}</p>
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
      <section className=" bg-white px-2 pl-3 w-80">
        <div className="col-span-4">
          <h2 className="font-bold text-xl text-center">
            {circleNewJoy.title}
          </h2>
          <div className="border-b-2  grid grid-cols-8">
            <p className="text-gray-600 text-xs col-span-1">場所</p>
            <p className="text-gray-600 text-xs col-span-6 text-center">
              {' '}
              {__(circleNewJoy.placeOfActivity, PlaceOfActivity._type)}
            </p>
          </div>
          <div className="border-b-2  grid grid-cols-8">
            <p className="text-gray-600 text-xs col-span-1">日時</p>
            <p className="text-gray-600 text-xs col-span-6 text-center">
              {getTime(circleNewJoy.startDate, circleNewJoy.endDate)}
            </p>
          </div>
        </div>
      </section>
      <section className="h-full w-20" style={{ paddingTop: '50px' }}>
        <Link
          href="/circle/[slug]/newjoy/[circleNewJoy.id]"
          as={`/circle/${slug}/newjoy/${circleNewJoy.id}`}
          prefetch={false}
        >
          <a className="text-blue-600 border-b border-blue-600 text-xs w-20">
            もっと詳しく
          </a>
        </Link>
      </section>
    </div>
  )
}

export { CircleNewJoyListItemPC }
