import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { FC } from 'react'
import { IndexCircleNewJoyListPC } from './IndexCircleNewJoyListPC'
import { IndexCircleNewJoyListSP } from './IndexCircleNewJoyListSP'

type Props = {
  circleId: number
  circleNewJoys: CircleNewJoy[]
}
const IndexCircleNewJoyList: FC<Props> = ({ circleId, circleNewJoys }) => {
  return (
    <div>
      <div className="md:hidden">
        <IndexCircleNewJoyListSP
          circleId={circleId}
          circleNewJoys={circleNewJoys}
        />
      </div>

      <div className="hidden md:block">
        <IndexCircleNewJoyListPC
          circleId={circleId}
          circleNewJoys={circleNewJoys}
        />
      </div>
    </div>
  )
}

export { IndexCircleNewJoyList }
