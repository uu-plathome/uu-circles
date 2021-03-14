import { Circle } from "@/lib/types/model/Circle"
import Link from "next/link"
import { FC } from "react"

const CircleListItem: FC<{
  circle: Circle
}> = ({ circle }) => {
    return (
        <Link href="/circle/[circleId]/edit" as={`/circle/${circle.id}/edit`}>
            <a>
              <div className="flex justify-center items-center rounded border border-gray-200 bg-white py-6" style={{ width: 280 }}>
                  <p className="font-lg font-bold">{ circle.name }</p>
              </div>
            </a>
        </Link>
    )
}

type Props = {
  circles: Circle[]
}
const CircleList: FC<Props> = ({ circles }) => {
    return (
        <div>
          {circles.map((circle) => {
            return (
              <div key={circle.id} className="mb-4 flex justify-center">
                  <CircleListItem circle={circle} />
              </div>
            )
          })}
        </div>
    )
}

export { CircleList }
