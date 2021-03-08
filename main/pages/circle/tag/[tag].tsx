import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseCircleList } from '@/components/organisms/List/BaseCircleList'
import { getCircleByTag } from '@/infra/api/circle'
import { Circle } from '@/lib/types/model/Circle'
import { TwoColumnContainer } from '@/components/molecules/Container/TwoColumnContainer'
import { CircleSidebar } from '@/components/organisms/Circles/CircleSidebar'
import { useRouter } from 'next/dist/client/router'
import { __ } from '@/lang/ja'
import { BaseHead } from '@/components/layouts/BaseHead'
import { CarouselCircleList } from '@/components/organisms/List/CarouselCircleList'
import {
  getAllTagSlugProperty,
  TagSlugProperty,
} from '@/lib/enum/api/TagSlugProperty'

type Props = {
  errorCode?: number
  circles?: Circle[]
  recommendCircles?: Circle[]
}
const Page: NextPage<Props> = ({ circles, recommendCircles }) => {
  const router = useRouter()
  const { tag } = router.query
  const circleTagTitle = __(String(tag).toUpperCase(), 'CircleTagTitle')
  const circleTagText = __(String(tag).toUpperCase(), 'CircleTagText')

  if (!circles) {
    return <div></div>
  }

  return (
    <div>
      <BaseHead title={`${__(String(tag).toUpperCase())}タグ検索`} />

      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <TwoColumnContainer sidebar={<CircleSidebar />}>
            <div className="px-5">
              <h1 className="text-2xl py-8">{__(String(tag).toUpperCase())}</h1>

              {circleTagTitle ? (
                <p className="text-base pb-4 font-bold">{circleTagTitle}</p>
              ) : (
                ''
              )}
              {circleTagText ? (
                <p className="text-sm pb-8">{circleTagText}</p>
              ) : (
                ''
              )}

              {/*  サークル一覧 */}
              <BaseCircleList circles={circles} />

              <div className="pb-8">
                <h2 className="text-lg py-8">他のサークルも見る</h2>

                <CarouselCircleList circles={recommendCircles} />
              </div>
            </div>
          </TwoColumnContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params.tag || Array.isArray(params.tag)) {
    return {
      notFound: true,
    }
  }

  const { circles, recommendCircles } = await getCircleByTag(params.tag)

  return {
    props: {
      circles,
      recommendCircles,
    },
    revalidate: 120,
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllTagSlugProperty().map((tag) => `/tag/${tag}`),
  fallback: true,
})

export default Page
