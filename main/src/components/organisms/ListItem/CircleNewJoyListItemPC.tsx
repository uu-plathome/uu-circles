import Link from 'next/link'
import { FC } from 'react'
import { __ } from '@/src/lang/ja'
import { PlaceOfActivity } from '@/src/lib/enum/api/PlaceOfActivity'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'
import { getDOW, getMonth, getDay, getTime } from '@/src/lib/utils/Date'

type Props = {
  slug: string
  circleNewJoy: CircleNewJoy
}
const CircleNewJoyListItemPC: FC<Props> = ({ slug, circleNewJoy }) => {
  return (
    <div
      className="flex justify-between items-center py-2 px-6 mx-auto mb-2 bg-white rounded-xl border border-gray-300"
      style={{ width: 500, height: 100 }}
    >
      <section
        className="rounded-2xl border border-gray-300"
        style={{
          width: 70,
          height: 70,
        }}
      >
        <div className="text-center text-white bg-gray-600 rounded-2xl rounded-b-none ">
          <p className="text-xs leading-5">{getDOW(circleNewJoy.startDate)}</p>
        </div>
        <div
          className="items-center pb-4 text-center text-black rounded-2xl rounded-t-none "
          style={{ borderRadius: '0 0 10 10 ' }}
        >
          <p className="text-xs leading-4">
            {getMonth(circleNewJoy.startDate)}月
          </p>
          <p className="text-2xl">{getDay(circleNewJoy.startDate)}</p>
        </div>
      </section>
      <section className="px-2 pl-3 w-80 bg-white ">
        <div className="col-span-4">
          <h2 className="text-xl font-bold text-center">
            {circleNewJoy.title}
          </h2>
          <div className="grid grid-cols-8 border-b-2">
            <p className="col-span-1 text-xs text-gray-600">場所</p>
            <p className="col-span-6 text-xs text-center text-gray-600">
              {' '}
              {__(circleNewJoy.placeOfActivity, PlaceOfActivity._type)}
            </p>
          </div>
          <div className="grid grid-cols-8 border-b-2">
            <p className="col-span-1 text-xs text-gray-600">日時</p>
            <p className="col-span-6 text-xs text-center text-gray-600">
              {getTime(circleNewJoy.startDate, circleNewJoy.endDate)}
            </p>
          </div>
        </div>
      </section>
      <section className="w-20 h-full" style={{ paddingTop: '50px' }}>
        <Link
          href="/circle/[slug]/newjoy/[circleNewJoy.id]"
          as={`/circle/${slug}/newjoy/${circleNewJoy.id}`}
          prefetch={false}
        >
          <a className="w-20 text-xs text-blue-600 border-b border-blue-600">
            もっと詳しく
          </a>
        </Link>
      </section>
    </div>
  )
}

export { CircleNewJoyListItemPC }
