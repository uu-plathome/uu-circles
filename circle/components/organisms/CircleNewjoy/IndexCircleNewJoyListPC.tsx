import { FC } from 'react'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { CircleNewJoyListItemPC } from '@/components/organisms/CircleNewjoy/CircleNewJoyListItemPC'

type Props = {
  circleId: number
  circleNewJoys: CircleNewJoy[]
}
const IndexCircleNewJoyListPC: FC<Props> = ({ circleId, circleNewJoys }) => {
  return (
    <div className="bg-gray-100">
      <div className="md:flex justify-center flex-wrap">
        {circleNewJoys &&
          circleNewJoys.map((circleNewJoy, idx) => {
            let className = idx % 3 === 0 ? 'place-self-end' : ''
            className = idx % 3 === 1 ? 'place-self-center' : className
            className = idx % 3 === 2 ? 'place-self-start' : className

            return (
              <div key={circleNewJoy.id} className={`md:px-4 ${className}`}>
                <CircleNewJoyListItemPC
                  circleId={circleId}
                  circleNewJoy={circleNewJoy}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export { IndexCircleNewJoyListPC }
