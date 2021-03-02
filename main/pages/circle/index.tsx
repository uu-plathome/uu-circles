import { GetServerSideProps, NextPage } from 'next'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseCircleList } from '@/components/organisms/List/BaseCircleList'
import { getAllCircleList } from '@/infra/api/circle'
import { Circle } from '@/lib/types/model/Circle'
import { TwoColumnContainer } from '@/components/molecules/Container/TwoColumnContainer'
import { CircleSidebar } from '@/components/organisms/Circles/CircleSidebar'
import { BaseHead } from '@/components/layouts/BaseHead'

type Props = {
  errorCode?: number
  circles: Circle[]
}
const Page: NextPage<Props> = ({ circles }) => {
  return (
    <div>
      <BaseHead title="サークル一覧" />

      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <TwoColumnContainer sidebar={<CircleSidebar />}>
            <div className="px-7">
              <h1 className="text-2xl py-8">サークル一覧</h1>

              {/*  サークル一覧 */}
              <BaseCircleList circles={circles} />
            </div>
          </TwoColumnContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { circles } = await getAllCircleList()

  return {
    props: {
      circles,
    },
  }
}

export default Page
