import colors from '@/colors'
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
import { dayjs } from '@/plugins/Dayjs'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import Image from 'next/image'
import { FC } from 'react'
import { WP_REST_API_Media, WP_REST_API_Post } from 'wp-types'

const WpPostBlock: FC<{
  post: WP_REST_API_Post
  media?: WP_REST_API_Media
}> = ({ post, media }) => {
  return (
    <article className="rounded-sm bg-white pb-4 mb-12 shadow-md md:pb-6 cursor-pointer">
      <a href={post.link} className="transition-all">
        <p className="wp-cardtype__img">
          <img
            src={(media && media.source_url) || '/images/uuyell-post.png'}
            alt={(media && media.alt_text) || ''}
          />
        </p>

        <div className="px-6 py-2 mb-2">
          {post.date ? (
            <p className="pt-2 flex items-center mb-2">
              <FontAwesomeIcon
                icon={faClock}
                color={colors.gray[400]}
                className="mr-1"
              />
              <span className="text-sm text-gray-400">
                {dayjs(post.date).format('YYYY年MM月DD日')}
              </span>
            </p>
          ) : (
            ''
          )}

          <div className="w-full pr-3">
            <h3
              className="text-black font-bold mb-1 max-line-4"
              style={{
                minHeight: '48px',
              }}
            >
              {post.title.rendered}
            </h3>
          </div>
        </div>
      </a>
    </article>
  )
}

type Props = {
  circle?: Circle
  circleTags?: CircleTagModel[]
  circleNewJoys?: CircleNewJoy[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Post[]
  /** uu-yellのサークルに関する記事 */ uuYellForCircles?: {
    posts: WP_REST_API_Post[]
    medias: WP_REST_API_Media[]
  }
  /** WordPress記事 */ wpPosts?: {
    postsNotTags: WP_REST_API_Post[]
    postsExistTags: WP_REST_API_Post[]
    medias: WP_REST_API_Media[]
  }
  errorCode?: number
}
const Page: NextPage<Props> = ({
  circle,
  circleTags,
  circleNewJoys,
  uuYellForCircles,
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

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 pb-16">
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
                <div className="order-5 pt-10 px-6 md:px-0">
                  <ShowCircleTitle>おすすめの投稿</ShowCircleTitle>

                  {wpPosts.postsExistTags.map((post, key) => {
                    return (
                      <div
                        key={`wpPosts.postsExistTags-${key}`}
                        className="mb-4"
                      >
                        <WpPostBlock
                          post={post}
                          media={wpPosts.medias.find(
                            (media) => media.id === post.featured_media
                          )}
                        />
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
                <div className="order-6 pt-10 px-6 md:px-0">
                  <ShowCircleTitle>最新の投稿</ShowCircleTitle>

                  {wpPosts.postsNotTags.map((post, key) => {
                    return (
                      <div key={`wpPosts.postsNotTags-${key}`} className="mb-4">
                        <WpPostBlock
                          post={post}
                          media={wpPosts.medias.find(
                            (media) => media.id === post.featured_media
                          )}
                        />
                      </div>
                    )
                  })}
                </div>
              ) : (
                ''
              )}
            </div>

            {uuYellForCircles &&
            uuYellForCircles.posts &&
            uuYellForCircles.posts.length > 0 ? (
              <div className="pt-10 px-6 md:px-0">
                <ShowCircleTitle>
                  uu-yellでサークルを詳しく知ろう！
                </ShowCircleTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 pb-8">
                  {uuYellForCircles.posts.map((post, key) => {
                    return (
                      <div key={`uuYellForCircles-${key}`} className="mb-4">
                        <WpPostBlock
                          post={post}
                          media={uuYellForCircles.medias.find(
                            (media) => media.id === post.featured_media
                          )}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              ''
            )}
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
      uuYellForCircles,
      wpPosts,
    } = await getCircleBySlug(params.slug)

    return {
      props: {
        circle,
        circleTags,
        circleNewJoys,
        uuYellArticles,
        uuYellForCircles,
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
