import { SearchTextField } from '@/components/atoms/form/SearchTextField'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { TwoColumnContainer } from '@/components/molecules/Container/TwoColumnContainer'
import { CircleSidebar } from '@/components/organisms/Circles/CircleSidebar'
import { RecommendTagList } from '@/components/organisms/Circles/RecommendTagList'
import { BaseCircleList } from '@/components/organisms/List/BaseCircleList'
import { useStringInput } from '@/hooks/useInput'
import { getAllCircleList } from '@/infra/api/circle'
import { TagSlugProperty } from '@/lib/enum/api/TagSlugProperty'
import { Announcement } from '@/lib/types/model/Announcement'
import { Circle } from '@/lib/types/model/Circle'
import { TagPageViewRanking } from '@/lib/types/model/TagPageViewRanking'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { FormEvent } from 'react'
import { WP_REST_API_Post } from 'wp-types'

type Props = {
  errorCode?: number
  circles?: Circle[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Post[]
  /** お知らせ */ announcements?: Announcement[]
  /** タグページ閲覧数 */ tagPageViewRanking: TagPageViewRanking
}
const Page: NextPage<Props> = ({ circles, uuYellArticles, announcements, tagPageViewRanking }) => {
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

      <BaseLayout
        announcement={
          announcements && announcements.length > 0
            ? announcements[0]
            : undefined
        }
      >
        <div className="bg-gray-100 px-2">
          <TwoColumnContainer sidebar={<CircleSidebar tagPageViewRanking={tagPageViewRanking} excludeTags={[TagSlugProperty.sport, TagSlugProperty.music, TagSlugProperty.culture, TagSlugProperty.community]} />}>
            <div className="px-7">
              <h1 className="text-2xl py-8">サークル一覧</h1>

              <div className="md:hidden mb-8">
                <form onSubmit={onSubmit}>
                  <SearchTextField id="search" name="search" expand {...name} />
                </form>
              </div>

              <div className="text-right mb-8">
                <p className="text-sm">
                  現在の掲載団体数
                  <span className="ml-4 mr-2 text-2xl font-bold">
                    {circles.length}
                  </span>
                  団体
                </p>
              </div>

              <RecommendTagList />

              {/*  サークル一覧 */}
              <BaseCircleList circles={circles} />
            </div>
          </TwoColumnContainer>
        </div>

        {/*  フッター */}
        <BaseFooter uuYellArticles={uuYellArticles} />
      </BaseLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { circles, uuYellArticles, announcements, tagPageViewRanking } = await getAllCircleList()

  return {
    props: {
      circles,
      uuYellArticles,
      announcements,
      tagPageViewRanking,
    },
    revalidate: 120,
  }
}

export default Page
