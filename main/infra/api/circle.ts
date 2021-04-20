import { CircleTagModel } from '@/lib/enum/api/CircleTagModel'
import { Circle } from '@/lib/types/model/Circle'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { AxiosError } from 'axios'
import { WP_REST_API_Media, WP_REST_API_Post } from 'wp-types'
import { PageNotFoundError, InternalServerError } from './error'
import { linkConst } from './linkConst'
import { axiosInstance } from '.'

export const getAllCircleList = async (): Promise<{
  circles: Circle[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Post[]
}> => {
  type Response = {
    data: Circle[]
    /** uu-yell記事 */ uuYellArticles: WP_REST_API_Post[]
  }
  const { data } = await axiosInstance.get<Response>(
    `${linkConst.CIRCLE.GROUP}`
  )

  return {
    circles: data.data,
    /** uu-yell記事 */ uuYellArticles: data.uuYellArticles,
  }
}

export const getCircleBySlug = async (
  slug: string
): Promise<{
  circle: Circle
  circleTags: CircleTagModel[]
  circleNewJoys: CircleNewJoy[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Post[]
  /** uu-yellのサークルに関する記事 */ uuYellForCircles?: {
    posts: WP_REST_API_Post[]
    medias: WP_REST_API_Media[]
  }
  /** WordPress記事 */ wpPosts: {
    postsNotTags: WP_REST_API_Post[]
    postsExistTags: WP_REST_API_Post[]
    medias: WP_REST_API_Media[]
  }
}> => {
  try {
    type Response = {
      data: Circle
      circleTags: CircleTagModel[]
      circleNewJoys: CircleNewJoy[]
      /** uu-yell記事 */ uuYellArticles: WP_REST_API_Post[]
      /** uu-yellのサークルに関する記事 */ uuYellForCircles?: {
        posts: WP_REST_API_Post[]
        medias: WP_REST_API_Media[]
      }
      /** WordPress記事 */ wpPosts: {
        postsNotTags: WP_REST_API_Post[]
        postsExistTags: WP_REST_API_Post[]
        medias: WP_REST_API_Media[]
      }
    }
    const { data } = await axiosInstance.get<Response>(
      linkConst.CIRCLE.SLUG(slug)
    )

    return {
      circle: data.data,
      circleTags: data.circleTags,
      circleNewJoys: data.circleNewJoys,
      /** uu-yell記事 */ uuYellArticles: data.uuYellArticles,
      /** uu-yellのサークルに関する記事 */
      uuYellForCircles: data.uuYellForCircles,
      /** WordPress記事 */ wpPosts: data.wpPosts,
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
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Post[]
}> => {
  type Response = {
    data: Circle[]
    recommendCircles: Circle[]
    /** uu-yell記事 */ uuYellArticles: WP_REST_API_Post[]
  }
  const { data } = await axiosInstance.get<Response>(
    linkConst.CIRCLE.CATEGORY(category)
  )

  return {
    circles: data.data,
    recommendCircles: data.recommendCircles,
    /** uu-yell記事 */ uuYellArticles: data.uuYellArticles,
  }
}

export const getCircleByTag = async (
  tag: string
): Promise<{
  circles: Circle[]
  recommendCircles: Circle[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Post[]
}> => {
  type Response = {
    data: Circle[]
    recommendCircles: Circle[]
    /** uu-yell記事 */ uuYellArticles: WP_REST_API_Post[]
  }
  const { data } = await axiosInstance.get<Response>(
    `${linkConst.CIRCLE.GROUP}/tag/${tag}`
  )

  return {
    circles: data.data,
    recommendCircles: data.recommendCircles,
    /** uu-yell記事 */ uuYellArticles: data.uuYellArticles,
  }
}

export const searchCircle = async (
  search: string
): Promise<{
  circles: Circle[]
  recommendCircles: Circle[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Post[]
}> => {
  type Response = {
    data: Circle[]
    recommendCircles: Circle[]
    /** uu-yell記事 */ uuYellArticles: WP_REST_API_Post[]
  }
  const { data } = await axiosInstance.get<Response>(
    encodeURI(`${linkConst.CIRCLE.GROUP}/search/${search}`)
  )

  return {
    circles: data.data,
    recommendCircles: data.recommendCircles,
    /** uu-yell記事 */ uuYellArticles: data.uuYellArticles,
  }
}
