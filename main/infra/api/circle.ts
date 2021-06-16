import { CircleTagModel } from '@/lib/enum/api/CircleTagModel'
import { Announcement } from '@/lib/types/model/Announcement'
import { Circle } from '@/lib/types/model/Circle'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { TagPageViewRanking } from '@/lib/types/model/TagPageViewRanking'
import { AxiosError } from 'axios'
import { WP_REST_API_Attachments, WP_REST_API_Posts } from 'wp-types'
import { PageNotFoundError, InternalServerError } from './error'
import { linkConst } from './linkConst'
import { axiosInstance } from '.'

export const getAllCircleList = async (): Promise<{
  circles: Circle[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
  /** タグページ閲覧数 */ tagPageViewRanking: TagPageViewRanking
}> => {
  type Response = {
    data: Circle[]
    /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
    /** お知らせ */ announcements: Announcement[]
    /** タグページ閲覧数 */ tagPageViewRanking: TagPageViewRanking
  }
  const { data } = await axiosInstance.get<Response>(
    `${linkConst.CIRCLE.GROUP}`
  )

  return {
    circles: data.data,
    /** uu-yell記事 */ uuYellArticles: data.uuYellArticles,
    /** お知らせ */ announcements: data.announcements,
    /** タグページ閲覧数 */ tagPageViewRanking: data.tagPageViewRanking,
  }
}

export const getCircleBySlug = async (
  slug: string
): Promise<{
  circle: Circle
  circleTags: CircleTagModel[]
  circleNewJoys: CircleNewJoy[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** WordPress記事 */ wpPosts: {
    postsNotTags: WP_REST_API_Posts
    postsExistTags: WP_REST_API_Posts
    medias: WP_REST_API_Attachments
  }
  /** お知らせ */ announcements: Announcement[]
}> => {
  try {
    type Response = {
      data: Circle
      circleTags: CircleTagModel[]
      circleNewJoys: CircleNewJoy[]
      /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
      /** WordPress記事 */ wpPosts: {
        postsNotTags: WP_REST_API_Posts
        postsExistTags: WP_REST_API_Posts
        medias: WP_REST_API_Attachments
      }
      /** お知らせ */ announcements: Announcement[]
    }
    const { data } = await axiosInstance.get<Response>(
      linkConst.CIRCLE.SLUG(slug)
    )

    return {
      circle: data.data,
      circleTags: data.circleTags,
      circleNewJoys: data.circleNewJoys,
      /** uu-yell記事 */ uuYellArticles: data.uuYellArticles,
      /** WordPress記事 */ wpPosts: data.wpPosts,
      /** お知らせ */ announcements: data.announcements,
    }
  } catch (_e) {
    const e = _e as AxiosError

    if (e.response.status === 404) {
      throw new PageNotFoundError(e.response.status, e.response.statusText)
    }

    throw new InternalServerError(e.response.status, e.response.statusText)
  }
}

export const getCircleByCategory = async (
  category: string
): Promise<{
  circles: Circle[]
  recommendCircles: Circle[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
  /** タグページ閲覧数 */ tagPageViewRanking: TagPageViewRanking
}> => {
  type Response = {
    data: Circle[]
    recommendCircles: Circle[]
    /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
    /** お知らせ */ announcements: Announcement[]
    /** タグページ閲覧数 */ tagPageViewRanking: TagPageViewRanking
  }
  const { data } = await axiosInstance.get<Response>(
    linkConst.CIRCLE.CATEGORY(category)
  )

  return {
    circles: data.data,
    recommendCircles: data.recommendCircles,
    /** uu-yell記事 */ uuYellArticles: data.uuYellArticles,
    /** お知らせ */ announcements: data.announcements,
    /** タグページ閲覧数 */ tagPageViewRanking: data.tagPageViewRanking,
  }
}

export const getCircleByTag = async (
  tag: string
): Promise<{
  circles: Circle[]
  recommendCircles: Circle[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
  /** タグページ閲覧数 */ tagPageViewRanking: TagPageViewRanking
}> => {
  type Response = {
    data: Circle[]
    recommendCircles: Circle[]
    /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
    /** お知らせ */ announcements: Announcement[]
    /** タグページ閲覧数 */ tagPageViewRanking: TagPageViewRanking
  }
  const { data } = await axiosInstance.get<Response>(
    `${linkConst.CIRCLE.GROUP}/tag/${tag}`
  )

  return {
    circles: data.data,
    recommendCircles: data.recommendCircles,
    /** uu-yell記事 */ uuYellArticles: data.uuYellArticles,
    /** お知らせ */ announcements: data.announcements,
    /** タグページ閲覧数 */ tagPageViewRanking: data.tagPageViewRanking,
  }
}

export const searchCircle = async (
  search: string
): Promise<{
  circles: Circle[]
  recommendCircles: Circle[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
  /** タグページ閲覧数 */ tagPageViewRanking: TagPageViewRanking
}> => {
  type Response = {
    data: Circle[]
    recommendCircles: Circle[]
    /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
    /** お知らせ */ announcements: Announcement[]
    /** タグページ閲覧数 */ tagPageViewRanking: TagPageViewRanking
  }
  const { data } = await axiosInstance.get<Response>(
    encodeURI(`${linkConst.CIRCLE.GROUP}/search/${search}`)
  )

  return {
    circles: data.data,
    recommendCircles: data.recommendCircles,
    /** uu-yell記事 */ uuYellArticles: data.uuYellArticles,
    /** お知らせ */ announcements: data.announcements,
    /** タグページ閲覧数 */ tagPageViewRanking: data.tagPageViewRanking,
  }
}
