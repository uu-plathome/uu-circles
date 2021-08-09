import { FC, HTMLAttributes } from 'react'

type Props = {
  id: HTMLAttributes<HTMLDivElement>['id']
  circleLength: number
  onChangeId(_pagePositionId: string): Promise<void>
}
export const CircleLengthView: FC<Props> = ({
  id,
  onChangeId,
  circleLength,
}) => {
  return (
    <div id={id} className="text-right mb-8" onMouseMove={() => onChangeId(id)}>
      <p className="text-sm">
        現在の掲載団体数
        <span className="ml-4 mr-2 text-2xl font-bold">{circleLength}</span>
        団体
      </p>
    </div>
  )
}
