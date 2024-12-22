import { AxiosError } from 'axios'
import { WP_REST_API_Posts } from 'wp-types'
import { InternalServerError, PageNotFoundError } from './error'
import { linkConst } from './linkConst'
import { axiosInstance } from '.'
import { CircleType } from '@/src/lib/enum/api/CircleType'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'

/**
 * 今日の新歓
 */
export type TodayCircleNewJoy = {
  slug: string
  circleType: CircleType
  mainImageUrl: string
  /** サークル名 */ name: string
  /** サークル省略名 */ shortName?: string
  circleNewJoy: CircleNewJoy
}

/**
 * 今日の新歓一覧
 */
type GetTodayCircleNewJoyResponse = {
  /** 今日の新歓 */ todayCircleNewJoys: TodayCircleNewJoy[]
  /** 新歓開催前 */ futureCircleNewJoys: TodayCircleNewJoy[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
}
/**
 * 今日の新歓一覧
 */
export const getTodayCircleNewJoy =
  async (): Promise<GetTodayCircleNewJoyResponse> => {
    try {
      type Response = GetTodayCircleNewJoyResponse
      const { data } = await axiosInstance.get<Response>(
        linkConst.CIRCLE_NEW_JOY.TODAY
      )

      return {
        /** 今日の新歓 */ todayCircleNewJoys: data.todayCircleNewJoys,
        /** 新歓開催前 */ futureCircleNewJoys: data.futureCircleNewJoys,
        /** uu-yell記事 */ uuYellArticles: data.uuYellArticles,
        /** お知らせ */ announcements: data.announcements,
      }
    } catch (_e) {
      const e = _e as AxiosError

      throw new InternalServerError(
        e.response ? e.response.status : 500,
        e.response ? e.response.statusText : 'Internal Server Error'
      )
    }
  }

/**
 * サークルの新歓を取得
 */
type GetCircleNewJoyResponse = {
  /** サークル */ circle: Circle
  /** 新歓開催済み */ pastCircleNewJoys: CircleNewJoy[]
  /** 新歓開催前 */ futureCircleNewJoys: CircleNewJoy[]
  /** 現在開催中 */ nowCircleNewJoys: CircleNewJoy[]
  /** 今日の新歓 */ todayCircleNewJoys: CircleNewJoy[]
  /** 今日の新歓(全て) */ allTodayCircleNewJoys: TodayCircleNewJoy[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
}
/**
 * サークルの新歓一覧を取得
 */
export const getCircleNewJoyBySlug = async (
  slug: string
): Promise<GetCircleNewJoyResponse> => {
  try {
    type Response = GetCircleNewJoyResponse
    const { data } = await axiosInstance.get<Response>(
      linkConst.CIRCLE_NEW_JOY.LIST(slug)
    )

    return {
      /** サークル */ circle: data.circle,
      /** 新歓開催済み */ pastCircleNewJoys: data.pastCircleNewJoys,
      /** 新歓開催前 */ futureCircleNewJoys: data.futureCircleNewJoys,
      /** 現在開催中 */ nowCircleNewJoys: data.nowCircleNewJoys,
      /** 今日の新歓 */ todayCircleNewJoys: data.todayCircleNewJoys,
      /** 今日の新歓(全て) */ allTodayCircleNewJoys: data.allTodayCircleNewJoys,
      /** uu-yell記事 */ uuYellArticles: data.uuYellArticles,
      /** お知らせ */ announcements: data.announcements,
    }
  } catch (_e) {
    const e = _e as AxiosError

    if (e.response && e.response.status === 404) {
      throw new PageNotFoundError(e.response.status, e.response.statusText)
    }

    throw new InternalServerError(
      e.response ? e.response.status : 500,
      e.response ? e.response.statusText : 'Internal Server Error'
    )
  }
}

/**
 * サークルの新歓詳細を取得
 */
type ShowCircleNewJoyBySlugResponse = {
  /** サークル */ circle: Circle
  /** 新歓詳細 */ circleNewJoy: CircleNewJoy
  /** 新歓開催済み */ pastCircleNewJoys: CircleNewJoy[]
  /** 新歓開催前 */ futureCircleNewJoys: CircleNewJoy[]
  /** 現在開催中 */ nowCircleNewJoys: CircleNewJoy[]
  /** 今日の新歓 */ todayCircleNewJoys: CircleNewJoy[]
  /** 今日の新歓(全て) */ allTodayCircleNewJoys: TodayCircleNewJoy[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
}
/**
 * サークルの新歓詳細を取得
 */
export const showCircleNewJoyBySlug = async (
  slug: string,
  circleNewJoyId: number
): Promise<ShowCircleNewJoyBySlugResponse> => {
  try {
    type Response = ShowCircleNewJoyBySlugResponse
    const { data } = await axiosInstance.get<Response>(
      linkConst.CIRCLE_NEW_JOY.SHOW(slug, circleNewJoyId)
    )

    return {
      /** サークル */ circle: data.circle,
      /** 新歓詳細 */ circleNewJoy: data.circleNewJoy,
      /** 新歓開催済み */ pastCircleNewJoys: data.pastCircleNewJoys,
      /** 新歓開催前 */ futureCircleNewJoys: data.futureCircleNewJoys,
      /** 現在開催中 */ nowCircleNewJoys: data.nowCircleNewJoys,
      /** 今日の新歓 */ todayCircleNewJoys: data.todayCircleNewJoys,
      /** 今日の新歓(全て) */ allTodayCircleNewJoys: data.allTodayCircleNewJoys,
      /** uu-yell記事 */ uuYellArticles: data.uuYellArticles,
      /** お知らせ */ announcements: data.announcements,
    }
  } catch (_e) {
    const e = _e as AxiosError

    if (e.response && e.response.status === 404) {
      throw new PageNotFoundError(e.response.status, e.response.statusText)
    }

    throw new InternalServerError(
      e.response ? e.response.status : 500,
      e.response ? e.response.statusText : 'Internal Server Error'
    )
  }
}
