import dynamic from 'next/dynamic'
import Image from 'next/image'
import { FC } from 'react'
import { WP_REST_API_Attachment, WP_REST_API_Post } from 'wp-types'
import { AppealingPoint } from './Parts/AppealingPoint'
import { CircleTopInformation } from './Parts/CircleTopInformation'
import { InformationField } from './Parts/InformationField'
import { NewJoyList } from './Parts/NewJoyList'
import { ShowCircleTitle } from './Parts/ShowCircleTitle'
import { TopImage } from './Parts/TopImage'
import { WpPostBlock } from './Parts/WpPostBlock'
import { GreenButton } from '@/src/components/atoms/button/GreenButton'
import { Props as BaseFooterProps } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { TwitterEmbed } from '@/src/components/organisms/Twitter/TwitterEmbed'
import { CircleTagModel } from '@/src/lib/enum/api/CircleTagModel'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'

const BaseFooter = dynamic<BaseFooterProps>(() =>
  import('@/src/components/layouts/BaseFooter').then((mod) => mod.BaseFooter)
)

const ID_LIST = {
  /** 活動写真 */
  CIRCLE_TOP_IMAGE: 'circle_top_image',
  /** アピールポイント */
  APPEALING_POINT: 'appealing_point',
  /** 新歓ビラ */
  CIRCLE_HANDBILL_IMAGE: 'circle_handbill_image',
  /** 新歓一覧 */
  NEWJOY_LIST: 'newjoy_list',
  /** サークル情報 */
  INFORMATION_FILED: 'information_filed',
  /** サークル WordPress おすすめ */
  WP_POSTS_RECOMMEND: 'wp_posts_recommend',
  /** サークル WordPress 最新の投稿 */
  WP_POSTS_RECENT: 'wp_posts_recent',
  /** サークル uu-yell */
  CIRCLE_UU_YELL_ARTICLES: 'circle_uu_yell_articles',
  /** サークル Twitter */
  CIRCLE_TWITTER: 'circle_uu_yell_articles',
} as const

type Props = {
  circle: Circle
  circleTags?: CircleTagModel[]
  circleNewJoys?: CircleNewJoy[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Post[]
  /** WordPress記事 */ wpPosts?: {
    postsNotTags: WP_REST_API_Post[]
    postsExistTags: WP_REST_API_Post[]
    medias: WP_REST_API_Attachment[]
  }
  /** お知らせ */ announcements?: Announcement[]
  uuYellForCircles: {
    posts: WP_REST_API_Post[]
    medias: WP_REST_API_Attachment[]
  }
}

export const ShowCircleTemplate: FC<Props> = ({
  circle,
  circleTags,
  circleNewJoys,
  uuYellArticles,
  wpPosts,
  announcements,
  uuYellForCircles,
}) => {
  // w : h = 210 : 297
  const width = 300
  const height = (300 * 297) / 210

  return (
    <BaseLayout
      announcement={
        announcements && announcements.length > 0 ? announcements[0] : undefined
      }
    >
      <div>
        <BaseContainer>
          <div id={ID_LIST.CIRCLE_TOP_IMAGE}>
            {/* 活動写真 */}
            <TopImage circle={circle} />

            {/* サークル情報 */}
            <CircleTopInformation circle={circle} />
          </div>

          <div className="grid grid-cols-1 pb-16 md:grid-cols-2 md:gap-8">
            <div id={ID_LIST.APPEALING_POINT} className="order-1">
              <AppealingPoint circle={circle} />
            </div>

            {circle.handbillImageUrl ? (
              <div id={ID_LIST.CIRCLE_HANDBILL_IMAGE} className="order-2 pt-10">
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

            <div id={ID_LIST.NEWJOY_LIST} className="order-4 pt-10 md:order-4">
              <>
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
              </>

              <div className="flex justify-center pt-8 pb-10 bg-gray-100">
                <GreenButton
                  href="/circle/[slug]/newjoy"
                  as={`/circle/${circle.slug}/newjoy`}
                >
                  もっと詳しく
                </GreenButton>
              </div>
            </div>

            <div
              id={ID_LIST.INFORMATION_FILED}
              className="order-3 pt-10 md:order-3"
            >
              <InformationField circle={circle} circleTags={circleTags || []} />
            </div>

            {wpPosts &&
            wpPosts.postsExistTags &&
            wpPosts.postsExistTags.length > 0 ? (
              <div
                id={ID_LIST.WP_POSTS_RECOMMEND}
                className="order-5 px-6 pt-10 md:px-0"
              >
                <ShowCircleTitle>おすすめの投稿</ShowCircleTitle>

                {wpPosts.postsExistTags.map((post, key) => {
                  return (
                    <div key={`wpPosts.postsExistTags-${key}`} className="mb-4">
                      <WpPostBlock
                        post={post}
                        media={
                          wpPosts.medias &&
                          wpPosts.medias.find(
                            (media) => media.id === post.featured_media
                          )
                        }
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
              <div
                id={ID_LIST.WP_POSTS_RECENT}
                className="order-6 px-6 pt-10 md:px-0"
              >
                <ShowCircleTitle>最新の投稿</ShowCircleTitle>

                {wpPosts.postsNotTags.map((post, key) => {
                  return (
                    <div key={`wpPosts.postsNotTags-${key}`} className="mb-4">
                      <WpPostBlock
                        post={post}
                        media={
                          wpPosts.medias &&
                          wpPosts.medias.find(
                            (media) => media.id === post.featured_media
                          )
                        }
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
            <div
              id={ID_LIST.CIRCLE_UU_YELL_ARTICLES}
              className="px-6 pt-10 md:px-0"
            >
              <ShowCircleTitle>
                uu-yellでサークルを詳しく知ろう！
              </ShowCircleTitle>

              <div className="grid grid-cols-1 pb-8 md:grid-cols-2 md:gap-4">
                {uuYellForCircles.posts.map((post, key) => {
                  return (
                    <div key={`uuYellForCircles-${key}`} className="mb-4">
                      <WpPostBlock
                        post={post}
                        media={
                          uuYellForCircles.medias &&
                          uuYellForCircles.medias.find(
                            (media) => media.id === post.featured_media
                          )
                        }
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            ''
          )}

          <div id={ID_LIST.CIRCLE_TWITTER}>
            {circle && circle.twitterUrl ? (
              <div className="px-6 pb-16 md:pr-2 md:pl-0">
                <ShowCircleTitle>{circle.name}のTwitter</ShowCircleTitle>

                <div className="md:w-1/2">
                  <TwitterEmbed
                    name={circle.name}
                    twitterLink={circle.twitterUrl}
                  />
                </div>
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
  )
}
