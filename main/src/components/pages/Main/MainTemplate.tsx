import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { FC } from 'react'
import { WP_REST_API_Attachments, WP_REST_API_Posts } from 'wp-types'
import { GreenButton } from '@/src/components/atoms/button/GreenButton'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { MainCircleList } from '@/src/components/pages/Main/Parts/MainCircleList'
import { MainUucircleTopButtons } from '@/src/components/pages/Main/Parts/MainUucircleTopButtons'
import { MainUucircleTopCarousel } from '@/src/components/pages/Main/Parts/MainUucircleTopCarousel'
import { PagePositionRecord } from '@/src/hooks/usePagePosition'
import { Advertise } from '@/src/lib/types/model/Advertise'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { PagePositions } from '@/src/lib/types/model/PagePosition'

const MainTagList = dynamic(() =>
  import('@/src/components/pages/Main/Parts/MainTagList').then(
    (mod) => mod.MainTagList
  )
)
const MainUucircleAd = dynamic(() =>
  import('@/src/components/pages/Main/Parts/MainUucircleAd').then(
    (mod) => mod.MainUucircleAd
  )
)
const MainUucircleBottomButtons = dynamic(() =>
  import('@/src/components/pages/Main/Parts/MainUucircleBottomButtons').then(
    (mod) => mod.MainUucircleBottomButtons
  )
)
const MainSponsorshipFooter = dynamic(() =>
  import('@/src/components/pages/Main/Parts/MainSponsorshipFooter').then(
    (mod) => mod.MainSponsorshipFooter
  )
)

const ID_LIST = {
  HEADER_CATCH_COPY: 'header_catch_copy',
  TOP_BUTTONS: 'top_buttons',
  /** おすすめのタグ */
  RECOMMEND_TAG_LIST: 'recommend_tag_list',
  /** サークル一覧 */
  CIRCLE_LIST_CONTAINER: 'circle_list_container',
  /** サークル一覧 */
  CIRCLE_LIST: 'circle_list',
  /** UU-Circles 広告 */
  UU_CIRCLES_AD: 'uu_circles_ad',
  /** uu-yell記事 */
  UU_YELL_ARTICLES: 'uu_yell_articles',
  /** 企業広告 */
  SPONSORSHIP_FOOTER: 'sponsorship_footer',
} as const

type Props = {
  advertises: Advertise[]
  mainAdvertises: Advertise[]
  circles: Circle[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
  uuYellForMain: {
    posts: WP_REST_API_Posts
    medias: WP_REST_API_Attachments
  }
  pagePositions: PagePositions
  recordPagePosition: PagePositionRecord[]
  onChangeId: (_pagePositionId: string) => Promise<void>
}
export const MainTemplate: FC<Props> = ({
  advertises,
  mainAdvertises,
  circles,
  uuYellArticles,
  uuYellForMain,
  announcements,
  pagePositions,
  recordPagePosition,
  onChangeId,
}) => {
  // const pagePositionIdNowLength =
  useMemo(() => {
    // 自分自身のIdを取得
    const recordPagePositionHistoryIds = recordPagePosition.map(
      (r) => r.pagePositionHistoryId
    )
    // 自分自身は除外する
    const pagePositionsExcludeOwn = pagePositions.pagePositions.filter(
      (p) => !recordPagePositionHistoryIds.includes(p.pagePositionHistoryId)
    )

    // サークルの処理
    const allCircleSlugs = pagePositionsExcludeOwn.filter(
      (p) => p.circleSlug
    ).map((p) => p.circleSlug)
    const uniqCircleSlugs = [...new Set(allCircleSlugs)]

    const retVal = {
      [ID_LIST.HEADER_CATCH_COPY]: pagePositionsExcludeOwn.filter(
        (p) => p.pagePositionId === ID_LIST.HEADER_CATCH_COPY
      ).length,
      [ID_LIST.TOP_BUTTONS]: pagePositionsExcludeOwn.filter(
        (p) => p.pagePositionId === ID_LIST.TOP_BUTTONS
      ).length,
      circlePageViews: uniqCircleSlugs.map((circleSlug) => ({
        circleSlug,
        count: pagePositionsExcludeOwn.filter(
          (p) => p.circleSlug === circleSlug
        ).length
      })),
      [ID_LIST.UU_CIRCLES_AD]: pagePositionsExcludeOwn.filter(
        (p) => p.pagePositionId === ID_LIST.UU_CIRCLES_AD
      ).length,
      [ID_LIST.UU_YELL_ARTICLES]: pagePositionsExcludeOwn.filter(
        (p) => p.pagePositionId === ID_LIST.UU_YELL_ARTICLES
      ).length,
      [ID_LIST.SPONSORSHIP_FOOTER]: pagePositionsExcludeOwn.filter(
        (p) => p.pagePositionId === ID_LIST.SPONSORSHIP_FOOTER
      ).length,
    }

    console.info(retVal)

    return retVal
  }, [pagePositions, recordPagePosition])

  return (
    <>
      <BaseLayout
        announcement={
          announcements && announcements.length > 0
            ? announcements[0]
            : undefined
        }
      >
        <MainUucircleTopCarousel advertises={mainAdvertises} />

        <div
          id={ID_LIST.HEADER_CATCH_COPY}
          style={{ marginTop: '-6px' }}
          className="relative bg-white"
          onMouseMove={() => onChangeId(ID_LIST.HEADER_CATCH_COPY)}
        >
          <p className="py-8 text-center">新歓をハックする！</p>
        </div>

        <div
          id={ID_LIST.TOP_BUTTONS}
          className="relative bg-white"
          onMouseMove={() => onChangeId(ID_LIST.TOP_BUTTONS)}
        >
          <MainUucircleTopButtons />
        </div>

        <BaseContainer>
          <div className="relative px-7" id={ID_LIST.CIRCLE_LIST_CONTAINER}>
            <MainTagList
              id={ID_LIST.RECOMMEND_TAG_LIST}
              onChangeId={onChangeId}
            />

            {/*  サークル一覧 */}
            <MainCircleList
              id={ID_LIST.CIRCLE_LIST}
              circles={circles}
              onChangeId={onChangeId}
            />

            <div className="flex justify-center pt-4 pb-10 bg-gray-100">
              <GreenButton href="/circle">もっと見る</GreenButton>
            </div>
          </div>
        </BaseContainer>

        <div className="bg-gray-100">
          {/*  フッター */}

          <div
            id={ID_LIST.UU_CIRCLES_AD}
            onMouseMove={() => onChangeId(ID_LIST.UU_CIRCLES_AD)}
          >
            <MainUucircleAd />
          </div>

          <div
            id={ID_LIST.UU_YELL_ARTICLES}
            onMouseMove={() => onChangeId(ID_LIST.UU_YELL_ARTICLES)}
          >
            <MainUucircleBottomButtons
              medias={uuYellForMain ? uuYellForMain.medias : []}
              posts={uuYellForMain ? uuYellForMain.posts : []}
            />
          </div>

          <div
            id={ID_LIST.SPONSORSHIP_FOOTER}
            onMouseMove={() => onChangeId(ID_LIST.SPONSORSHIP_FOOTER)}
          >
            <MainSponsorshipFooter advertises={advertises} />
          </div>

          <BaseFooter uuYellArticles={uuYellArticles} />
        </div>
      </BaseLayout>
    </>
  )
}
