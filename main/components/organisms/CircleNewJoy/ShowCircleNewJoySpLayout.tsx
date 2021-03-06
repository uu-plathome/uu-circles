import { Circle } from "@/lib/types/model/Circle"
import { CircleNewJoy } from "@/lib/types/model/CircleNewJoy"
import { FC } from "react"
import { IndexCircleNewJoyListSP } from "../List/IndexCircleNewJoyListSP"
import { CircleNewJoyDetail } from "../Newjoy/CircleNewJoyDetail"
import { InformationCircleBesideNewJoySP } from "../ShowCircle/InformationCircleBesideNewJoySP"

type ShowCircleNewJoySpLayoutProps = {
  /** サークル */ circle?: Circle
  /** 新歓詳細 */ circleNewJoy?: CircleNewJoy
  /** 新歓開催済み */ pastCircleNewJoys?: CircleNewJoy[]
  /** 新歓開催前 */ futureCircleNewJoys?: CircleNewJoy[]
  /** 現在開催中 */ nowCircleNewJoys?: CircleNewJoy[]
  /** 今日の新歓 */ todayCircleNewJoys?: CircleNewJoy[]
  /** 今日の新歓(全て) */ allTodayCircleNewJoys?: {
    slug: string
    circleNewJoy: CircleNewJoy
  }[]
}
const ShowCircleNewJoySpLayout: FC<ShowCircleNewJoySpLayoutProps> = ({
  circle,
  circleNewJoy,
  pastCircleNewJoys,
  futureCircleNewJoys,
  nowCircleNewJoys,
  todayCircleNewJoys
}) => {
  return (
    <div>
      <div className="pb-16">
        <CircleNewJoyDetail circleNewJoy={circleNewJoy} />
      </div>

      {nowCircleNewJoys && nowCircleNewJoys.length > 0 ? (
        <div className="pb-16">
          <h2 className="font-bold text-lg md:text-center pl-1 mb-3">
            開催中
          </h2>

          <IndexCircleNewJoyListSP
            slug={circle.slug}
            circleNewJoys={nowCircleNewJoys}
          />
        </div>
      ) : (
        <p className="text-center">開催中の新歓はありません</p>
      )}

      <div className="pb-16">
        <h2 className="font-bold text-lg md:text-center pl-4 mb-3">
          今日の新歓
        </h2>
        {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
          <div>
            <IndexCircleNewJoyListSP
              slug={circle.slug}
              circleNewJoys={todayCircleNewJoys}
            />
          </div>
        ) : (
          <p className="text-center">今日の新歓はありません</p>
        )}
      </div>

      <div className="pb-16">
        <h2 className="font-bold text-lg md:text-center pl-4 mb-3">
          開催予定
        </h2>

        {futureCircleNewJoys && futureCircleNewJoys.length > 0 ? (
          <IndexCircleNewJoyListSP
            slug={circle.slug}
            circleNewJoys={futureCircleNewJoys}
          />
        ) : (
          <p className="text-center">開催予定の新歓はありません</p>
        )}
      </div>

      <div className="pb-16">
        <h2 className="font-bold text-lg md:text-center pl-4 mb-3">
          開催済み
        </h2>

        {pastCircleNewJoys && pastCircleNewJoys.length > 0 ? (
          <IndexCircleNewJoyListSP
            slug={circle.slug}
            circleNewJoys={pastCircleNewJoys}
          />
        ) : (
          <p className="text-center">開催済みの新歓はありません</p>
        )}
      </div>

      <InformationCircleBesideNewJoySP circle={circle} />
    </div>
  )
}

export { ShowCircleNewJoySpLayout }
