import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseCircleList } from '@/components/organisms/List/BaseCircleList'
import { getAllCircleList } from '@/infra/api/circle'
import { Circle } from '@/lib/types/model/Circle'
import { TwoColumnContainer } from '@/components/molecules/Container/TwoColumnContainer'
import { CircleSidebar } from '@/components/organisms/Circles/CircleSidebar'
import { BaseHead } from '@/components/layouts/BaseHead'
import { SearchTextField } from '@/components/atoms/form/SearchTextField'
import { useStringInput } from '@/hooks/useInput'
import { useRouter } from 'next/dist/client/router'
import { FormEvent } from 'react'
import { RecommendTagList } from '@/components/organisms/Circles/RecommendTagList'

type Props = {
  errorCode?: number
  circles: Circle[]
}
const Page: NextPage<Props> = ({ circles }) => {
  const router = useRouter()
  const name = useStringInput('')
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (name.value) {
      router.push(`/circle/search/[name]`, `/circle/search/${name.value}`)
    } else {
      router.push(`/circle`)
    }
  }

  return (
    <div>
      <BaseHead title="サークル一覧" />

      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <TwoColumnContainer sidebar={<CircleSidebar />}>
            <div className="px-7">
              <h1 className="text-2xl py-8">サークル一覧</h1>

              <div className="md:hidden mb-8">
                <form onSubmit={onSubmit}>
                  <SearchTextField id="search" name="search" expand {...name} />
                </form>
              </div>

              <RecommendTagList />

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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { circles } = await getAllCircleList()

  return {
    props: {
      circles,
    },
    revalidate: 120,
  }
}

export default Page
