import { FC } from 'react'
import { CarouselCircleList } from '@/src/components/organisms/List/CarouselCircleList'
import { Circle } from '@/src/lib/types/model/Circle'

/**
 * 他のサークルも見る
 */
export const RecommendCircleList: FC<{
  id: string
  recommendCircles: Circle[]
}> = ({ id, recommendCircles }) => {
  return (
    <div id={id} className="pb-8">
      <h2 className="py-8 text-lg">他のサークルも見る</h2>

      <CarouselCircleList circles={recommendCircles} />
    </div>
  )
}
