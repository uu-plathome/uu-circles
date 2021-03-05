import { axiosInstance } from '.'
import { linkConst } from './linkConst'
import { Circle } from '@/lib/types/model/Circle'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { CircleType } from '@/lib/enum/api/CircleType'
import { AxiosError } from 'axios'
import { InternalServerError, PageNotFoundError } from './error'

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
export const getTodayCircleNewJoy = async (): Promise<{
  /** 今日の新歓 */ todayCircleNewJoys: TodayCircleNewJoy[]
  /** 新歓開催前 */ futureCircleNewJoys: TodayCircleNewJoy[]
}> => {
  try {
    type Response = {
      /** 今日の新歓 */ todayCircleNewJoys: TodayCircleNewJoy[]
      /** 新歓開催前 */ futureCircleNewJoys: TodayCircleNewJoy[]
    }
    const { data } = await axiosInstance.get<Response>(
      linkConst.CIRCLE_NEW_JOY.TODAY
    )

    return {
      /** 今日の新歓 */ todayCircleNewJoys: data.todayCircleNewJoys,
      /** 新歓開催前 */ futureCircleNewJoys: data.futureCircleNewJoys,
    }
  } catch (_e) {
    const e = _e as AxiosError

    throw new InternalServerError(e.response.status, e.response.statusText)
  }
}

export const getCircleNewJoyBySlug = async (
  slug: string
): Promise<{
  /** サークル */ circle: Circle
  /** 新歓開催済み */ pastCircleNewJoys: CircleNewJoy[]
  /** 新歓開催前 */ futureCircleNewJoys: CircleNewJoy[]
  /** 現在開催中 */ nowCircleNewJoys: CircleNewJoy[]
  /** 今日の新歓 */ todayCircleNewJoys: CircleNewJoy[]
  /** 今日の新歓(全て) */ allTodayCircleNewJoys: TodayCircleNewJoy[]
}> => {
  try {
    type Response = {
      /** サークル */ circle: Circle
      /** 新歓開催済み */ pastCircleNewJoys: CircleNewJoy[]
      /** 新歓開催前 */ futureCircleNewJoys: CircleNewJoy[]
      /** 現在開催中 */ nowCircleNewJoys: CircleNewJoy[]
      /** 今日の新歓 */ todayCircleNewJoys: CircleNewJoy[]
      /** 今日の新歓(全て) */ allTodayCircleNewJoys: TodayCircleNewJoy[]
    }
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
    }
  } catch (_e) {
    const e = _e as AxiosError

    if (e.response.status === 404) {
      throw new PageNotFoundError(e.response.status, e.response.statusText)
    }

    throw new InternalServerError(e.response.status, e.response.statusText)
  }
}

export const showCircleNewJoyBySlug = async (
  slug: string,
  circleNewJoyId: number
): Promise<{
  /** サークル */ circle: Circle
  /** 新歓詳細 */ circleNewJoy: CircleNewJoy
  /** 新歓開催済み */ pastCircleNewJoys: CircleNewJoy[]
  /** 新歓開催前 */ futureCircleNewJoys: CircleNewJoy[]
  /** 現在開催中 */ nowCircleNewJoys: CircleNewJoy[]
  /** 今日の新歓 */ todayCircleNewJoys: CircleNewJoy[]
  /** 今日の新歓(全て) */ allTodayCircleNewJoys: TodayCircleNewJoy[]
}> => {
  try {
    type Response = {
      /** サークル */ circle: Circle
      /** 新歓詳細 */ circleNewJoy: CircleNewJoy
      /** 新歓開催済み */ pastCircleNewJoys: CircleNewJoy[]
      /** 新歓開催前 */ futureCircleNewJoys: CircleNewJoy[]
      /** 現在開催中 */ nowCircleNewJoys: CircleNewJoy[]
      /** 今日の新歓 */ todayCircleNewJoys: CircleNewJoy[]
      /** 今日の新歓(全て) */ allTodayCircleNewJoys: TodayCircleNewJoy[]
    }
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
    }
  } catch (_e) {
    const e = _e as AxiosError

    if (e.response.status === 404) {
      throw new PageNotFoundError(e.response.status, e.response.statusText)
    }

    throw new InternalServerError(e.response.status, e.response.statusText)
  }
}
