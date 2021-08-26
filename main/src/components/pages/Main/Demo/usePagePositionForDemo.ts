import { useMemo } from 'react'
import { TOP_BUTTONS_ID_LIST } from '../Parts/MainUucircleTopButtons/top_buttons_id_list'
import { ID_LIST } from '../id_list'
import { UsePagePosition, UsePagePositionArg } from '@/src/hooks/usePagePosition'
import { PagePositions } from '@/src/lib/types/model/PagePosition'

type CircleSlugArg = {
  candidateCircleSlug: string[]
}

export const usePagePositionForDemo = ({
  pageUrl,
  circleSlug,
  identifierHash,
  candidateCircleSlug,
}: UsePagePositionArg & CircleSlugArg): UsePagePosition  => {
  const createdAt = useMemo(() => (new Date()).toString(), [])

  const pageData: PagePositions = useMemo(() => {
    return {
      pageUrl,
      pagePositions: [
        {
          pagePositionHistoryId: -1,
          pageUrl,
          pagePositionId: ID_LIST.HEADER_CATCH_COPY,
          createdAt
        },
        {
          pagePositionHistoryId: -1,
          pageUrl,
          pagePositionId: TOP_BUTTONS_ID_LIST.TOP_BUTTONS_NEW_JOY,
          createdAt
        },
        {
          pagePositionHistoryId: -1,
          pageUrl,
          pagePositionId: TOP_BUTTONS_ID_LIST.TOP_BUTTONS_NEW_JOY,
          createdAt
        },
        {
          pagePositionHistoryId: -1,
          pageUrl,
          pagePositionId: TOP_BUTTONS_ID_LIST.TOP_BUTTONS_NEW_JOY,
          createdAt
        },
        {
          pagePositionHistoryId: -1,
          pageUrl,
          pagePositionId: TOP_BUTTONS_ID_LIST.TOP_BUTTONS_NEW_JOY,
          createdAt
        },
        {
          pagePositionHistoryId: -1,
          pageUrl,
          pagePositionId: TOP_BUTTONS_ID_LIST.TOP_BUTTONS_NEW_JOY,
          createdAt
        },
        {
          pagePositionHistoryId: -1,
          pageUrl,
          pagePositionId: TOP_BUTTONS_ID_LIST.TOP_BUTTONS_TO_NEW_STUDENTS,
          createdAt
        },
        {
          pagePositionHistoryId: -1,
          pageUrl,
          pagePositionId: TOP_BUTTONS_ID_LIST.TOP_BUTTONS_TO_NEW_STUDENTS,
          createdAt
        },
        {
          pagePositionHistoryId: -1,
          pageUrl,
          pagePositionId: ID_LIST.RECOMMEND_TAG_LIST,
          createdAt
        },
        {
          pagePositionHistoryId: -1,
          pageUrl,
          pagePositionId: ID_LIST.RECOMMEND_TAG_LIST,
          createdAt
        },
        {
          pagePositionHistoryId: -1,
          pageUrl,
          pagePositionId: ID_LIST.UU_CIRCLES_AD,
          createdAt
        },
        {
          pagePositionHistoryId: -1,
          pageUrl,
          pagePositionId: ID_LIST.UU_YELL_ARTICLES,
          createdAt
        },
        {
          pagePositionHistoryId: -1,
          pageUrl,
          pagePositionId: ID_LIST.UU_YELL_ARTICLES,
          createdAt
        },
        {
          pagePositionHistoryId: -1,
          pageUrl,
          pagePositionId: ID_LIST.SPONSORSHIP_FOOTER,
          createdAt
        },
        ...candidateCircleSlug.map((_slug) => ({
          pagePositionHistoryId: -1,
          pageUrl: `/circle/${_slug}`,
          pagePositionId: '',
          circleSlug: _slug,
          createdAt
        }))
      ]
    }
  }, [pageUrl, createdAt, candidateCircleSlug])


  return {
    pagePositionId: '',
    pageData,
    pageUrl,
    circleSlug,
    identifierHash,
    recordPagePosition: [],
    onChangeId: async (_pagePositionId: string) => { return },
  }
}
