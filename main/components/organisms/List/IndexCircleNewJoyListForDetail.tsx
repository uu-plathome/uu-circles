import { FC } from 'react'
import { CircleNewJoyListItemForDetail } from '../ListItem/CircleNewJoyListItemForDetail'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { useRouter } from 'next/dist/client/router'

type Props = {
  circleNewJoy: CircleNewJoy[]
}
const IndexCircleNewJoyListForDetail: FC<Props> = ({ circleNewJoy }) => {
  return (
    <div className="bg-gray-100">
      <div className="flex justify-center flex-wrap">
        {circleNewJoy &&
          circleNewJoy.map((circleNewJoy, idx) => {
            let className = idx % 3 === 0 ? 'place-self-end' : ''
            className = idx % 3 === 1 ? 'place-self-center' : className
            className = idx % 3 === 2 ? 'place-self-start' : className
            const router = useRouter()
            const { NewJoyId } = router.query
            if (circleNewJoy.id == NewJoyId) {
              return (
                <div
                  key={circleNewJoy.circleNewJoy.id}
                  className={`md:px-4 ${className}`}
                >
                  <CircleNewJoyListItemForDetail circleNewJoy={circleNewJoy} />
                </div>
              )
            }
            return 'エラー'
          })}
      </div>
    </div>
  )
}

export { IndexCircleNewJoyListForDetail }
