import { FC } from 'react'
import { IndexCircleNewJoyListSP } from '../List/IndexCircleNewJoyListSP'
import { CircleNewJoyDetail } from '../Newjoy/CircleNewJoyDetail'
import { InformationCircleBesideNewJoySP } from '../ShowCircle/InformationCircleBesideNewJoySP'
import { Circle } from '@/src/lib/types/model/Circle'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'

const CircleNewJoyTitle: FC = ({ children }) => {
  return <h2 className="font-bold text-center mb-3">{children}</h2>
}

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
  todayCircleNewJoys,
}) => {
  return (
    <div>
      <div className="pb-16">
        <CircleNewJoyDetail circle={circle} circleNewJoy={circleNewJoy} />
      </div>

      <InformationCircleBesideNewJoySP circle={circle} />

      {nowCircleNewJoys && nowCircleNewJoys.length > 0 ? (
        <div className="pb-16">
          <CircleNewJoyTitle>開催中</CircleNewJoyTitle>

          <IndexCircleNewJoyListSP
            slug={circle.slug}
            circleNewJoys={nowCircleNewJoys}
          />
        </div>
      ) : (
        ''
      )}

      {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
        <div className="pb-16">
          <CircleNewJoyTitle>今日の新歓</CircleNewJoyTitle>

          <IndexCircleNewJoyListSP
            slug={circle.slug}
            circleNewJoys={todayCircleNewJoys}
          />
        </div>
      ) : (
        ''
      )}

      <div className="pb-16">
        <CircleNewJoyTitle>開催予定</CircleNewJoyTitle>

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
        <CircleNewJoyTitle>開催済み</CircleNewJoyTitle>

        {pastCircleNewJoys && pastCircleNewJoys.length > 0 ? (
          <IndexCircleNewJoyListSP
            slug={circle.slug}
            circleNewJoys={pastCircleNewJoys}
          />
        ) : (
          <p className="text-center">開催済みの新歓はありません</p>
        )}
      </div>
    </div>
  )
}

export { ShowCircleNewJoySpLayout }
