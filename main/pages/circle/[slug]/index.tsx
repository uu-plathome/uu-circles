import { GreenButton } from '@/components/atoms/button/GreenButton'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { AppealingPoint } from '@/components/organisms/ShowCircle/AppealingPoint'
import { CircleTopInformation } from '@/components/organisms/ShowCircle/CircleTopInformation'
import { InformationField } from '@/components/organisms/ShowCircle/InformationField'
import { NewJoyList } from '@/components/organisms/ShowCircle/NewJoyList'
import { ShowCircleTitle } from '@/components/organisms/ShowCircle/ShowCircleTitle'
import { TopImage } from '@/components/organisms/ShowCircle/TopImage'
import { getCircleBySlug } from '@/infra/api/circle'
import { PageNotFoundError } from '@/infra/api/error'
import { CircleTagModel } from '@/lib/enum/api/CircleTagModel'
import { Circle } from '@/lib/types/model/Circle'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import Image from 'next/image'
import { FC } from 'react'
import { WP_REST_API_Post } from 'wp-types'

const WpPostBlock: FC<{
  post: WP_REST_API_Post
}> = ({ post }) => {
  return (
    <a href={post.link}>
      <div
        className="border border-gray-300 bg-white rounded-lg flex justify-between items-center px-6 py-2 mx-auto md:mx-0 mb-2"
        style={{ width: 320 }}
      >
        <div className="w-full pr-3">
          <h3 className="text-black font-bold text-sm mb-1 max-line-4 ">
            {post.title.rendered}
          </h3>
        </div>

        <div>
          <div
            className="text-white bg-blue-800 rounded-full text-xs flex items-center justify-center cursor-pointer"
            style={{ width: 52, height: 52 }}
          >
            見る
          </div>
        </div>
      </div>
    </a>
  )
}

type Props = {
  circle?: Circle
  circleTags?: CircleTagModel[]
  circleNewJoys?: CircleNewJoy[]
  /** UU-yellの記事 */ uuYellArticles?: WP_REST_API_Post[]
  /** WordPress記事 */ wpPosts?: {
    postsNotTags: WP_REST_API_Post[]
    postsExistTags: WP_REST_API_Post[]
  }
  errorCode?: number
}
const Page: NextPage<Props> = ({
  circle,
  circleTags,
  circleNewJoys,
  uuYellArticles,
  wpPosts,
  errorCode,
}) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  if (!circle) {
    return <div></div>
  }

  // w : h = 210 : 297
  const width = 300
  const height = (300 * 297) / 210

  return (
    <div>
      <BaseHead
        title={`${circle.name} サークル詳細`}
        description={circle.description}
      />

      <BaseLayout>
        <div>
          <BaseContainer>
            <div>
              <div className="bg-white">
                <TopImage circle={circle} />
              </div>

              <CircleTopInformation circle={circle} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 pb-20">
              <div className="order-1">
                <AppealingPoint circle={circle} />
              </div>

              {circle.handbillImageUrl ? (
                <div className="order-2 pt-10">
                  <ShowCircleTitle>新歓ビラ</ShowCircleTitle>

                  <div className="flex justify-center md:justify-start">
                    <a
                      href={circle.handbillImageUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        src={circle.handbillImageUrl}
                        alt={`${circle.name}新歓ビラ`}
                        width={width}
                        height={height}
                        className="rounded"
                        objectFit="cover"
                      />
                    </a>
                  </div>
                </div>
              ) : (
                ''
              )}

              <div className="order-3 md:order-4 pt-10">
                <div>
                  {circleNewJoys && circleNewJoys.length > 0 ? (
                    <div>
                      <NewJoyList
                        slug={circle.slug}
                        circleNewJoys={circleNewJoys}
                      />
                    </div>
                  ) : (
                    <div>
                      <ShowCircleTitle>新歓イベント日程</ShowCircleTitle>

                      <p className="text-center">
                        現在開催予定の新歓はありません
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-8 pb-10 bg-gray-100 flex justify-center">
                  <GreenButton
                    href="/circle/[slug]/newjoy"
                    as={`/circle/${circle.slug}/newjoy`}
                  >
                    もっと詳しく
                  </GreenButton>
                </div>
              </div>

              <div className="order-4 md:order-3 pt-10">
                <InformationField circle={circle} circleTags={circleTags} />
              </div>

              {wpPosts &&
              wpPosts.postsExistTags &&
              wpPosts.postsExistTags.length > 0 ? (
                <div className="order-5 pt-10">
                  <ShowCircleTitle>おすすめの投稿</ShowCircleTitle>

                  {wpPosts.postsExistTags.map((post, key) => {
                    return (
                      <div
                        key={`wpPosts.postsExistTags-${key}`}
                        className="mb-4"
                      >
                        <WpPostBlock post={post} />
                      </div>
                    )
                  })}
                </div>
              ) : (
                ''
              )}

              {wpPosts &&
              wpPosts.postsNotTags &&
              wpPosts.postsNotTags.length > 0 ? (
                <div className="order-6 pt-10">
                  <ShowCircleTitle>最新の投稿</ShowCircleTitle>

                  {wpPosts.postsNotTags.map((post, key) => {
                    return (
                      <div key={`wpPosts.postsNotTags-${key}`} className="mb-4">
                        <WpPostBlock post={post} />
                      </div>
                    )
                  })}
                </div>
              ) : (
                ''
              )}
            </div>
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter uuYellArticles={uuYellArticles} />
      </BaseLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params.slug || Array.isArray(params.slug)) {
    return {
      notFound: true,
    }
  }

  try {
    const {
      circle,
      circleTags,
      circleNewJoys,
      uuYellArticles,
      wpPosts,
    } = await getCircleBySlug(params.slug)

    return {
      props: {
        circle,
        circleTags,
        circleNewJoys,
        uuYellArticles,
        wpPosts,
      },
      revalidate: 120,
    }
  } catch (e) {
    if (e instanceof PageNotFoundError) {
      return {
        notFound: true,
      }
    }

    return { props: { errorCode: 500 } }
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export default Page
