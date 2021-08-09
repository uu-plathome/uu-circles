import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'
import { FC } from 'react'
import { CircleNewJoyListItemPC } from '../ListItem/CircleNewJoyListItemPC'

type Props = {
  slug: string
  circleNewJoys: CircleNewJoy[]
}
const IndexCircleNewJoyListPC: FC<Props> = ({ slug, circleNewJoys }) => {
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
                  slug={slug}
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
