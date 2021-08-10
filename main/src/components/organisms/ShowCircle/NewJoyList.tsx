import { FC } from 'react'
import { CircleNewJoyListItemSP } from '../ListItem/CircleNewJoyListItemSP'
import { ShowCircleTitle } from './ShowCircleTitle'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'

type Props = {
  slug: string
  circleNewJoys: CircleNewJoy[]
}
const NewJoyList: FC<Props> = ({ slug, circleNewJoys }) => {
  return (
    <div className="bg-gray-100">
      <ShowCircleTitle>新歓イベント日程</ShowCircleTitle>

      <div className="md:flex justify-center flex-wrap">
        {circleNewJoys.map((circleNewJoy) => {
          const className = 'md:mr-auto'

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
