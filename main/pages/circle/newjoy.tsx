import { GetServerSideProps, NextPage } from 'next'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { getTodayCircleNewJoy } from '@/infra/api/circleNewJoy'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import Link from 'next/link'
import { IndexCircleNewJoyListForNoSlug } from '@/components/organisms/List/IndexCircleNewJoyListForNoSlug'
import { useMediaQuery } from '@/hooks/useMediaQuery'
type Props = {
  errorCode?: number

  futureCircleNewJoys?: {
    slug: string
    circleNewJoy: CircleNewJoy
  }[]
  todayCircleNewJoys?: {
    circleNewJoy: CircleNewJoy
  }[]
}
const Page: NextPage<Props> = ({ futureCircleNewJoys, todayCircleNewJoys }) => {
  const { isMd } = useMediaQuery() //画面サイズによってレイアウト分けるため。

  return (
    <div>
      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <BaseContainer>
            {isMd ? (
              <h1 className="text-2xl py-20 text-center">今日の新歓</h1>
            ) : (
              <h1 className="text-2xl py-8 text-center">今日の新歓</h1>
            )}

            {isMd ? (
              ''
            ) : (
              <h2 className="font-bold text-lg md:text-center pl-1 mb-3">
                今日開催予定の新歓イベント
              </h2>
            )}

            <div className="pb-16">
              <div className="pb-16">
                {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
                  <IndexCircleNewJoyListForNoSlug
                    circleNewJoys={todayCircleNewJoys}
                  />
                ) : (
                  <p>今日の新歓はありません</p>
                )}
              </div>
            </div>

            <div className="pb-16">
              {isMd ? (
                <h1 className="text-2xl py-20 text-center">
                  開催予定の新歓一覧
                </h1>
              ) : (
                <h2 className="font-bold text-lg md:text-center pl-1 mb-3 ">
                  開催日時が近い新歓イベント
                </h2>
              )}
            </div>
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const {
    futureCircleNewJoys,
    todayCircleNewJoys,
  } = await getTodayCircleNewJoy()

  return {
    props: {
      futureCircleNewJoys,
      todayCircleNewJoys,
    },
  }
}

export default Page
