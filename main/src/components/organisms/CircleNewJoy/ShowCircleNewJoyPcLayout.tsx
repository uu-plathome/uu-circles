import Link from 'next/link'
import { FC } from 'react'
import { IndexCircleNewJoyListPC } from '../List/IndexCircleNewJoyListPC'
import { CircleNewJoyDetail } from '../Newjoy/CircleNewJoyDetail'
import { InformationCircleBesideNewJoyPCWithButton } from '../ShowCircle/InformationCircleBesideNewJoyPCWithButton'
import { YellowButton } from '@/src/components/atoms/button/YellowButton'
import { Circle } from '@/src/lib/types/model/Circle'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'

const CircleNewJoyTitle: FC = ({ children }) => {
  return <h2 className="font-bold text-center pl-1 mb-3">{children}</h2>
}

type Props = {
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
const ShowCircleNewJoyPcLayout: FC<Props> = ({
  circle,
  circleNewJoy,
  pastCircleNewJoys,
  futureCircleNewJoys,
  nowCircleNewJoys,
  todayCircleNewJoys,
}) => {
  return (
    <div>
      <div className="pb-16 grid grid-cols-7">
        <div className="col-span-5">
          <CircleNewJoyDetail circle={circle} circleNewJoy={circleNewJoy} />
        </div>

        <div className="col-span-2  ml-6">
          <h2 className="text-xl">主催サークル</h2>

          <InformationCircleBesideNewJoyPCWithButton circle={circle} />

          <Link href="/circle/newjoy">
            <a>
              <div className="my-6 w-full">
                <YellowButton width={'222px'}>
                  <div className="py-2">
                    <h4 className="text-xs">他のサークルの新歓も見る</h4>
                    <h3 className="text-sm font-bold">
                      今日の新歓をチェック！
                    </h3>
                  </div>
                </YellowButton>
              </div>
            </a>
          </Link>
        </div>
      </div>

      {nowCircleNewJoys && nowCircleNewJoys.length > 0 ? (
        <div className="pb-16">
          <CircleNewJoyTitle>開催中</CircleNewJoyTitle>

          <IndexCircleNewJoyListPC
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

          <IndexCircleNewJoyListPC
            slug={circle.slug}
            circleNewJoys={todayCircleNewJoys}
          />
        </div>
      ) : (
        ''
      )}

      <div className="pb-16">
        <CircleNewJoyTitle>開催予定</CircleNewJoyTitle>

        <IndexCircleNewJoyListPC
          slug={circle.slug}
          circleNewJoys={futureCircleNewJoys}
        />
      </div>

      <div className="pb-32">
        <CircleNewJoyTitle>開催済み</CircleNewJoyTitle>

        <IndexCircleNewJoyListPC
          slug={circle.slug}
          circleNewJoys={pastCircleNewJoys}
        />
      </div>
    </div>
  )
}

export { ShowCircleNewJoyPcLayout }
