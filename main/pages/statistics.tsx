import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { getStatistics } from '@/infra/api/statistics'
import { Statistics } from '@/lib/types/model/Statistics'
import { GetStaticProps, NextPage } from 'next'
import { FC } from 'react'

const SubHeader: FC = ({ children }) => {
  return <h2 className="text-xl font-bold text-center mb-4">{children}</h2>
}

type Props = {
  statistics: Statistics
}
const Page: NextPage<Props> = ({ statistics }) => {
  return (
    <div>
      <BaseHead title="統計情報" />

      <BaseLayout>
        <div className="bg-gray-100">
          <BaseContainer>
            <h1 className="text-2xl py-8 md:py-20 md:text-center text-left">
              統計情報
            </h1>

            <div className="pb-16">
              <SubHeader>サークル数</SubHeader>
              <p className="text-center">
                UU-Circlesには、
                <b className="text-xl">{statistics.circleCount}</b>
                団体が登録されています！
              </p>
            </div>

            <div className="pb-16">
              <SubHeader>サークルの平均活動費用</SubHeader>
              <p className="text-center">
                UU-Circlesに登録されているサークルの平均活動費用は、
                <b className="text-xl">
                  {statistics.averageActivityCost.toLocaleString()}
                </b>
                円です！
              </p>
            </div>
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const statistics = await getStatistics()

  return {
    props: {
      statistics,
    },
    revalidate: 60 * 60,
  }
}

export default Page
