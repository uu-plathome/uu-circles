import { TodayCircleNewJoy } from '@/infra/api/circleNewJoy'
import { FC } from 'react'
import { CircleNewJoyListItemForNoSlug } from '../ListItem/CircleNewJoyListItemForNoSlug'

type Props = {
  circleNewJoys: TodayCircleNewJoy[]
  isDemo?: boolean
}
const IndexCircleNewJoyListForNoSlug: FC<Props> = ({ circleNewJoys, isDemo }) => {
  return (
    <div className="bg-gray-100">
      <div className="flex justify-center flex-wrap">
        {circleNewJoys &&
          circleNewJoys.map((circleNewJoy, idx) => {
            let className = idx % 3 === 0 ? 'place-self-end' : ''
            className = idx % 3 === 1 ? 'place-self-center' : className
            className = idx % 3 === 2 ? 'place-self-start' : className

            return (
              <div
                key={circleNewJoy.circleNewJoy.id}
                className={`md:px-4 ${className}`}
              >
                <CircleNewJoyListItemForNoSlug
                  todayCircleNewJoy={circleNewJoy}
                  isDemo={isDemo}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export { IndexCircleNewJoyListForNoSlug }
