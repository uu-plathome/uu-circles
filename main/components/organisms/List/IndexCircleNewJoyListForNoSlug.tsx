import { FC } from 'react'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { CircleNewJoyListItemForNoSlug } from '../ListItem/CircleNewJoyListItemForNoSlug'

type Props = {
  circleNewJoys: CircleNewJoy[]
}
const IndexCircleNewJoyListForNoSlug: FC<Props> = ({ circleNewJoys }) => {
  console.log('コンポーネント第一')
  console.log(circleNewJoys)
  return (
    <div className="bg-gray-100">
      <div className="md:flex justify-center">
        {circleNewJoys &&
          circleNewJoys.map((circleNewJoy, idx) => {
            let className = idx % 3 === 0 ? 'place-self-end' : ''
            className = idx % 3 === 1 ? 'place-self-center' : className
            className = idx % 3 === 2 ? 'place-self-start' : className
            console.log(circleNewJoy)
            return (
              <div key={circleNewJoy.id} className={`md:px-4 ${className}`}>
                <CircleNewJoyListItemForNoSlug circleNewJoy={circleNewJoy} />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export { IndexCircleNewJoyListForNoSlug }
