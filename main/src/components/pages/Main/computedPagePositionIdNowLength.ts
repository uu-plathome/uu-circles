import { TOP_BUTTONS_ID_LIST } from './Parts/MainUucircleTopButtons/top_buttons_id_list'
import { ID_LIST } from './id_list'
import { PagePositionRecord } from '@/src/hooks/usePagePosition'
import { PagePositions } from '@/src/lib/types/model/PagePosition'

export const computedPagePositionIdNowLength = ({
  pagePositions,
  recordPagePosition,
}: {
  pagePositions: PagePositions
  recordPagePosition: PagePositionRecord[]
}) => {
  // 自分自身のIdを取得
  const recordPagePositionHistoryIds = recordPagePosition.map(
    (r) => r.pagePositionHistoryId
  )
  // 自分自身は除外する
  const pagePositionsExcludeOwn = pagePositions.pagePositions.filter(
    (p) => !recordPagePositionHistoryIds.includes(p.pagePositionHistoryId)
  )

  // サークルの処理
  const allCircleSlugs = pagePositionsExcludeOwn
    .filter((p) => p.circleSlug)
    .map((p) => p.circleSlug)
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
        (p) =>
          p.circleSlug === circleSlug ||
          p.pagePositionId === `${ID_LIST.CIRCLE_LIST}-${circleSlug}`
      ).length,
    })),
    [ID_LIST.RECOMMEND_TAG_LIST]: pagePositionsExcludeOwn.filter(
      (p) => p.pagePositionId === ID_LIST.RECOMMEND_TAG_LIST
    ).length,
    [ID_LIST.UU_CIRCLES_AD]: pagePositionsExcludeOwn.filter(
      (p) => p.pagePositionId === ID_LIST.UU_CIRCLES_AD
    ).length,
    [ID_LIST.UU_YELL_ARTICLES]: pagePositionsExcludeOwn.filter(
      (p) => p.pagePositionId === ID_LIST.UU_YELL_ARTICLES
    ).length,
    [ID_LIST.SPONSORSHIP_FOOTER]: pagePositionsExcludeOwn.filter(
      (p) => p.pagePositionId === ID_LIST.SPONSORSHIP_FOOTER
    ).length,
    [TOP_BUTTONS_ID_LIST.TOP_BUTTONS_TO_NEW_STUDENTS]:
      pagePositionsExcludeOwn.filter(
        (p) =>
          p.pagePositionId ===
            TOP_BUTTONS_ID_LIST.TOP_BUTTONS_TO_NEW_STUDENTS ||
          p.pageUrl === '/guide/to-new-students'
      ).length,
    [TOP_BUTTONS_ID_LIST.TOP_BUTTONS_NEW_JOY]: pagePositionsExcludeOwn.filter(
      (p) =>
        p.pagePositionId === TOP_BUTTONS_ID_LIST.TOP_BUTTONS_NEW_JOY ||
        p.pageUrl === '/circle/newjoy'
    ).length,
    [TOP_BUTTONS_ID_LIST.TOP_BUTTONS_DISCORD]: pagePositionsExcludeOwn.filter(
      (p) =>
        p.pagePositionId === TOP_BUTTONS_ID_LIST.TOP_BUTTONS_DISCORD ||
        p.pageUrl === '/guide/discord'
    ).length,
  }

  return retVal
}

export type ComputedPagePositionIdNowLength = ReturnType<
  typeof computedPagePositionIdNowLength
>
