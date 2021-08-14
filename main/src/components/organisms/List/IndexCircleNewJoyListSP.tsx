import { FC } from 'react'
import { CircleNewJoyListItemSP } from '../ListItem/CircleNewJoyListItemSP'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'

type Props = {
  slug: string
  circleNewJoys: CircleNewJoy[]
}
const IndexCircleNewJoyListSP: FC<Props> = ({ slug, circleNewJoys }) => {
  return (
    <div className="bg-gray-100">
      <div className="md:flex flex-wrap justify-center">
        {circleNewJoys &&
          circleNewJoys.map((circleNewJoy, idx) => {
            let className = idx % 3 === 0 ? 'place-self-end' : ''
            className = idx % 3 === 1 ? 'place-self-center' : className
            className = idx % 3 === 2 ? 'place-self-start' : className

            return (
              <div key={circleNewJoy.id} className={`md:px-4 ${className}`}>
                <CircleNewJoyListItemSP
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

export { IndexCircleNewJoyListSP }
