import { NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { DemoCircleNewJoyListItem } from '@/components/molecules/list_items/DemoCircleNewJoyListItem'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { getDemoCircleNewJoyList } from '@/infra/api/demo_cirecle_new_joy'

const IndexPage: NextPage = () => {
  const { isMd } = useMediaQuery()

  // デモ新歓一覧の取得
  const { data } = useSWR(
    `/admin/api/circle/demo/newjoy`,
    getDemoCircleNewJoyList
  )

  return (
    <div>
      <Head>
        <title>新歓新規作成</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper
          title="デモ新歓一覧"
          actionText="新歓新規作成"
          actionHref="/demo/newjoy/create"
          actionAs={`/demo/newjoy/create`}
        >
          <div className="border-2 border-gray-800 p-2">
            {data && data.demoCircleNewJoys && data.demoCircleNewJoys.length > 0
              ? data.demoCircleNewJoys.map((demoCircleNewJoy) => {
                  return (
                    <DemoCircleNewJoyListItem
                      key={`circle-${demoCircleNewJoy.demoCircleNewJoy.demoCircleNewJoyId}`}
                      name={demoCircleNewJoy.name}
                      circleId={demoCircleNewJoy.circleId}
                      demoCircleNewJoy={demoCircleNewJoy.demoCircleNewJoy}
                    />
                  )
                })
              : ''}
            {data &&
            data.demoCircleNewJoys &&
            data.demoCircleNewJoys.length === 0 ? (
              <div className="py-4">
                <p className="text-white">まだ新歓が登録されていません</p>
              </div>
            ) : (
              ''
            )}
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default IndexPage
