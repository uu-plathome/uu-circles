import { FC } from 'react'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { CircleNewJoyListItem } from '../ListItem/CircleNewJoyListItem'

type Props = {
  slug: string
  circleNewJoys: CircleNewJoy[]
}
const IndexCircleNewJoyList: FC<Props> = ({ slug, circleNewJoys }) => {
  return (
    <div className="bg-gray-100">
      <div className="md:flex justify-center">
        {circleNewJoys &&
          circleNewJoys.map((circleNewJoy, idx) => {
            let className = idx % 3 === 0 ? 'place-self-end' : ''
            className = idx % 3 === 1 ? 'place-self-center' : className
            className = idx % 3 === 2 ? 'place-self-start' : className

            return (
              <div key={circleNewJoy.id} className={`md:px-4 ${className}`}>
                <CircleNewJoyListItem slug={slug} circleNewJoy={circleNewJoy} />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export { IndexCircleNewJoyList }
