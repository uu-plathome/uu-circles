import { FC } from 'react'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { CircleNewJoyListItemSP } from '../ListItem/CircleNewJoyListItemSP'

type Props = {
  slug: string
  circleNewJoys: CircleNewJoy[]
}
const NewJoyList: FC<Props> = ({ slug, circleNewJoys }) => {
  return (
    <div className="bg-gray-100">
      <h2 className="text-center md:text-left mb-8 text-lg font-bold">
        新歓イベント日程
      </h2>

      <div className="md:flex justify-center flex-wrap">
        {circleNewJoys.map((circleNewJoy, idx) => {
          let className = idx === 0 ? 'place-self-end' : ''
          className = idx === 1 ? 'place-self-center' : className
          className = idx === 2 ? 'place-self-start' : className

          return (
            <div key={circleNewJoy.id} className={`md:px-4 ${className}`}>
              <CircleNewJoyListItemSP slug={slug} circleNewJoy={circleNewJoy} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { NewJoyList }
