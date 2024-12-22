import { FC } from 'react'
import { CircleNewJoyListItemForNoSlug } from '../ListItem/CircleNewJoyListItemForNoSlug'
import { TodayCircleNewJoy } from '@/src/lib/infra/api/circleNewJoy'

type Props = {
  circleNewJoys: TodayCircleNewJoy[]
}
const IndexCircleNewJoyListForNoSlug: FC<Props> = ({
  circleNewJoys
}) => {
  return (
    <div className="bg-gray-100">
      <div className="flex flex-wrap justify-center">
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
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export { IndexCircleNewJoyListForNoSlug }
