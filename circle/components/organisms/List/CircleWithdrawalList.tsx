import { Circle } from "@/lib/types/model/Circle"
import { FC } from "react"

const CircleWithdrawalListItem: FC<{
  circle: Circle,
  onWithdrawal(): void
}> = ({ circle, onWithdrawal }) => {
    return (
      <a className="shadow hover:shadow-md cursor-pointer" onClick={() => onWithdrawal()}>
        <div
          className="flex justify-center items-center rounded border border-gray-200 bg-white py-6"
          style={{ width: 280 }}
        >
          <p className="font-lg font-bold">{ circle.name }</p>
        </div>
      </a>
    )
}

type Props = {
  circles: Circle[]
  onWithdrawal(circleId: number): void
}
const CircleWithdrawalList: FC<Props> = ({ circles, onWithdrawal }) => {
    return (
        <div>
          {circles.map((circle) => {
            return (
              <div key={`CircleWithdrawalList-${circle.id}`} className="mb-4 flex justify-center">
                <CircleWithdrawalListItem
                  circle={circle}
                  onWithdrawal={() => onWithdrawal(circle.id)}
                />
              </div>
            )
          })}
        </div>
    )
}

export { CircleWithdrawalList }
