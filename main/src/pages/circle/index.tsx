import { SearchTextField } from '@/src/components/atoms/form/SearchTextField'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { TwoColumnContainer } from '@/src/components/molecules/Container/TwoColumnContainer'
import { CircleSidebar } from '@/src/components/organisms/Circles/CircleSidebar'
import { RecommendTagList } from '@/src/components/organisms/Circles/RecommendTagList'
import { BaseCircleList } from '@/src/components/organisms/List/BaseCircleList'
import { useStringInput } from '@/src/hooks/useInput'
import { usePagePosition } from '@/src/hooks/usePagePosition'
import { TagSlugProperty } from '@/src/lib/enum/api/TagSlugProperty'
import { LocalStorageKey } from '@/src/lib/enum/app/LocalStorageKey'
import { getAllCircleList } from '@/src/lib/infra/api/circle'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { TagPageViewRanking } from '@/src/lib/types/model/TagPageViewRanking'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { FormEvent, useEffect, useState } from 'react'
import { WP_REST_API_Posts } from 'wp-types'

const ID_LIST = {
  CIRCLE_LENGTH: 'circle_length',
  RECOMMEND_TAG_LIST: 'recommend_tag_list',
  CIRCLE_LIST: 'circle_list',
}

type Props = {
  errorCode?: number
  circles?: Circle[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Posts
  /** お知らせ */ announcements?: Announcement[]
  /** タグページ閲覧数 */ tagPageViewRanking: TagPageViewRanking
}
const Page: NextPage<Props> = ({
  circles,
  uuYellArticles,
  announcements,
  tagPageViewRanking,
}) => {
  const router = useRouter()
  // 識別子の取得
  const [identifierHash, setIdentifierHash] = useState(null)
  useEffect(() => {
    setIdentifierHash(localStorage.getItem(LocalStorageKey.identifierHash))
  }, [])


  const name = useStringInput('')
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (name.value) {
      router.push(`/circle/search/[name]`, `/circle/search/${name.value}`)
    } else {
      router.push(`/circle`)
    }
  }

  // ページ位置
  const { onChangeId } = usePagePosition({
    pageUrl: '/circle',
    pageName: 'circle_index',
    identifierHash,
  })

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
          <TwoColumnContainer
            sidebar={
              <CircleSidebar
                tagPageViewRanking={tagPageViewRanking}
                excludeTags={[
                  TagSlugProperty.sport,
                  TagSlugProperty.music,
                  TagSlugProperty.culture,
                  TagSlugProperty.community,
                ]}
              />
            }
          >
            <div className="px-7">
              <h1 className="text-2xl py-8">サークル一覧</h1>

              <div className="md:hidden mb-8">
                <form onSubmit={onSubmit}>
                  <SearchTextField id="search" name="search" expand {...name} />
                </form>
              </div>

              <div
                id={ID_LIST.CIRCLE_LENGTH}
                className="text-right mb-8"
                onMouseMove={() => onChangeId(ID_LIST.CIRCLE_LENGTH)}
              >
                <p className="text-sm">
                  現在の掲載団体数
                  <span className="ml-4 mr-2 text-2xl font-bold">
                    {circles.length}
                  </span>
                  団体
                </p>
              </div>

              <div
                id={ID_LIST.RECOMMEND_TAG_LIST}
                onMouseMove={() => onChangeId(ID_LIST.RECOMMEND_TAG_LIST)}
              >
                <RecommendTagList />
              </div>

              <div
                id={ID_LIST.CIRCLE_LIST}
                onMouseMove={() => onChangeId(ID_LIST.CIRCLE_LIST)}
              >
                {/*  サークル一覧 */}
                <BaseCircleList circles={circles} />
              </div>
            </div>
          </TwoColumnContainer>
        </div>

        {/*  フッター */}
        <BaseFooter uuYellArticles={uuYellArticles} />
      </BaseLayout>
    </div >
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { circles, uuYellArticles, announcements, tagPageViewRanking } =
    await getAllCircleList()

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
