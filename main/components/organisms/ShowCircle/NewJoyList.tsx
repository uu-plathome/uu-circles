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
      <h2 className="text-center md:text-left mb-8 text-lg">
        新歓イベント日程
      </h2>

      <div className="md:flex justify-center flex-wrap">
        {circleNewJoys.map((circleNewJoy, idx) => {
          let className = idx === 0 ? 'place-self-end md:mr-auto' : ''
          className = idx === 1 ? 'place-self-center md:mr-auto' : className
          className = idx === 2 ? 'place-self-start md:mr-auto' : className

          return (
            <div key={circleNewJoy.id} className={`${className}`}>
              <CircleNewJoyListItemSP slug={slug} circleNewJoy={circleNewJoy} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { NewJoyList }
