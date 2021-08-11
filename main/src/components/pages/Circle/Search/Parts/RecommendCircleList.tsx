import { FC } from 'react'
import { CarouselCircleList } from '@/src/components/organisms/List/CarouselCircleList'
import { Circle } from '@/src/lib/types/model/Circle'

/**
 * 他のサークルも見る
 */
export const RecommendCircleList: FC<{
  id: string
  recommendCircles: Circle[]
  onChangeId(_pagePositionId: string): Promise<void>
}> = ({ id, recommendCircles, onChangeId }) => {
  return (
    <div id={id} className="pb-8" onMouseOver={() => onChangeId(id)}>
      <h2 className="text-lg py-8">他のサークルも見る</h2>

      <CarouselCircleList circles={recommendCircles} />
    </div>
  )
}
