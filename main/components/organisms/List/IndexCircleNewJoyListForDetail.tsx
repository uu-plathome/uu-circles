import { FC } from 'react'
import { CircleNewJoyListItemForDetail } from '../Newjoy/CircleNewJoyListItemForDetail'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { useRouter } from 'next/dist/client/router'
import { getCircleNewJoyBySlug } from '@/infra/api/circleNewJoy'

type Props = {
  circleNewJoys: CircleNewJoy[]
}
const IndexCircleNewJoyListForDetail: FC<Props> = ({ circleNewJoys }) => {
  const router = useRouter()
  const NewJoyId = router.query.circleNewJoyId
  // console.log(NewJoyId)
  // console.log(circleNewJoys)
  return (
    <div className="bg-gray-100">
      <div className="flex justify-center flex-wrap">
        {getCircleNewJoyBySlug &&
          circleNewJoys.map((circleNewJoy, idx) => {
            let className = idx % 3 === 0 ? 'place-self-end' : ''
            className = idx % 3 === 1 ? 'place-self-center' : className
            className = idx % 3 === 2 ? 'place-self-start' : className

            if (circleNewJoy.id == NewJoyId) {
              return (
                <div key={circleNewJoy.id} className={`md:px-4 ${className}`}>
                  <CircleNewJoyListItemForDetail circleNewJoy={circleNewJoy} />
                </div>
              )
            }
          })}
      </div>
    </div>
  )
}

export { IndexCircleNewJoyListForDetail }
