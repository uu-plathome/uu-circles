import axios from 'axios'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import { useState } from 'react'
import { useEffect } from 'react'
import useSWR from 'swr'
import { WP_REST_API_Attachment, WP_REST_API_Post } from 'wp-types'
import { BaseHead, baseUuCirclesUrl } from '@/src/components/layouts/BaseHead'
import { ShowCircleTemplate } from '@/src/components/pages/Circle/Show/ShowCircleTemplate'
import { usePagePosition } from '@/src/hooks/usePagePosition'
import { AnnouncementType } from '@/src/lib/enum/api/AnnouncementType'
import { CircleTagModel } from '@/src/lib/enum/api/CircleTagModel'
import { Importance } from '@/src/lib/enum/api/Importance'
import { ApiUrl } from '@/src/lib/enum/app/ApiUrl'
import { LocalStorageKey } from '@/src/lib/enum/app/LocalStorageKey'
import { getCircleBySlug } from '@/src/lib/infra/api/circle'
import { PageNotFoundError } from '@/src/lib/infra/api/error'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'

const UU_YELL_URL = ApiUrl.UU_YELL

type Props = {
  circle?: Circle
  circleTags?: CircleTagModel[]
  circleNewJoys?: CircleNewJoy[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Post[]
  /** WordPress記事 */ wpPosts?: {
    postsNotTags: WP_REST_API_Post[]
    postsExistTags: WP_REST_API_Post[]
    medias: WP_REST_API_Attachment[]
  }
  errorCode?: number
  /** お知らせ */ announcements?: Announcement[]
}
const Page: NextPage<Props> = ({
  circle,
  circleTags,
  circleNewJoys,
  uuYellArticles,
  wpPosts,
  errorCode,
  announcements,
}) => {
  // 識別子の取得
  const [identifierHash, setIdentifierHash] = useState<string>(null)
  useEffect(() => {
    setIdentifierHash(localStorage.getItem(LocalStorageKey.identifierHash))
  }, [])

  const { data: uuYellForCircles } = useSWR<{
    posts: WP_REST_API_Post[]
    medias: WP_REST_API_Attachment[]
  }>(['/circle/[slug]', circle.slug], async () => {
    const fetchedPosts = await Promise.all([
      axios.get<WP_REST_API_Post[]>(
        `${UU_YELL_URL}/wp-json/wp/v2/posts?context=embed&search=${circle.name}`
      ),
      axios.get<WP_REST_API_Post[]>(
        `${UU_YELL_URL}/wp-json/wp/v2/posts?context=embed&search=https://uu-circles.com/circle/${circle.name}`
      ),
    ])

    const allPosts = [...fetchedPosts[0].data, ...fetchedPosts[1].data]

    // 重複している投稿の削除
    const postIds = [
      ...new Set([
        ...fetchedPosts[0].data.map((post) => post.id),
        ...fetchedPosts[1].data.map((post) => post.id),
      ]),
    ]
    const posts = postIds.map((postId) =>
      allPosts.find((post) => post.id === postId)
    )

    if (posts.length === 0) {
      return {
        posts: [],
        medias: [],
      }
    }

    const mediaIds = posts.map((post) => post.featured_media)
    const queryMediaIds = mediaIds.join(',')

    // 記事のアイキャッチ画像のURLを取得
    const fetchedMedias = await axios.get<WP_REST_API_Attachment[]>(
      `${UU_YELL_URL}/wp-json/wp/v2/media?context=embed&include=${queryMediaIds}`
    )

    return {
      posts,
      medias: fetchedMedias.data,
    }
  })

  const { onChangeId } = usePagePosition({
    pageUrl: `/circle/${circle.slug}`,
    pageName: `circle_show_${circle.slug}`,
    circleSlug: circle.slug,
    identifierHash,
  })

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  if (!circle) {
    return <div></div>
  }

  return (
    <>
      <BaseHead
        title={`${circle.name} - サークル紹介`}
        description={circle.description}
        breadcrumbJsonLdItemListElements={[
          {
            position: 1,
            name: 'Home',
            item: baseUuCirclesUrl,
          },
          {
            position: 2,
            name: 'サークル一覧',
            item: `${baseUuCirclesUrl}/circle`,
          },
          {
            position: 2,
            name: circle.name,
            item: `${baseUuCirclesUrl}/circle/${circle.slug}`,
          },
        ]}
        carouselJsonLdData={[
          {
            url: `${baseUuCirclesUrl}/circle/newjoy`,
          },
          ...circleNewJoys.map((circleNewJoy) => ({
            url: `${baseUuCirclesUrl}/circle/newjoy/${circleNewJoy.id}`,
          })),
        ]}
      />

      <ShowCircleTemplate
        circle={circle}
        circleTags={circleTags}
        circleNewJoys={circleNewJoys}
        uuYellArticles={uuYellArticles}
        wpPosts={wpPosts}
        announcements={announcements}
        uuYellForCircles={uuYellForCircles}
        onChangeId={onChangeId}
      />
    </>
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
      announcements,
    } = await getCircleBySlug(params.slug)

    // デモ画面のみに表示する時は、「デモ画面」であることがわかるようにする
    let newAnnouncements: Announcement[] = announcements
    if (circle.isOnlyDemo) {
      newAnnouncements = [
        {
          announcementId: 0,
          title: 'これはデモ画面です。正しい新歓ではありません。',
          announcementType: AnnouncementType.UPDATE_FEATURE,
          importance: Importance.MIDDLE,
        },
      ]
    }

    return {
      props: {
        circle,
        circleTags,
        circleNewJoys,
        uuYellArticles,
        wpPosts,
        announcements: newAnnouncements,
      },
      revalidate: 180,
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
