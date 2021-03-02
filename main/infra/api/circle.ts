import { Circle } from '@/lib/types/model/Circle'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { AxiosError } from 'axios'
import { axiosInstance } from '.'
import { PageNotFoundError, InternalServerError } from './error'
import { linkConst } from './linkConst'

export const getAllCircleList = async (): Promise<{
  circles: Circle[]
}> => {
  type Response = {
    data: Circle[]
  }
  const { data } = await axiosInstance.get<Response>(
    `${linkConst.CIRCLE.GROUP}`
  )

  return {
    circles: data.data,
  }
}

export const getCircleBySlug = async (
  slug: string
): Promise<{
  circle: Circle
  circleNewJoys: CircleNewJoy[]
}> => {
  try {
    type Response = {
      data: Circle
      circleNewJoys: CircleNewJoy[]
    }
    const { data } = await axiosInstance.get<Response>(
      linkConst.CIRCLE.SLUG(slug)
    )

    return {
      circle: data.data,
      circleNewJoys: data.circleNewJoys,
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
}> => {
  type Response = {
    data: Circle[]
    recommendCircles: Circle[]
  }
  const { data } = await axiosInstance.get<Response>(
    linkConst.CIRCLE.CATEGORY(category)
  )

  return {
    circles: data.data,
    recommendCircles: data.recommendCircles,
  }
}

export const getCircleByTag = async (
  tag: string
): Promise<{
  circles: Circle[]
  recommendCircles: Circle[]
}> => {
  type Response = {
    data: Circle[]
    recommendCircles: Circle[]
  }
  const { data } = await axiosInstance.get<Response>(
    `${linkConst.CIRCLE.GROUP}/tag/${tag}`
  )

    return {
        circles: data.data,
        recommendCircles: data.recommendCircles
    }
}


export const searchCircle = async (search: string): Promise<{
    circles: Circle[],
    recommendCircles: Circle[]
}> => {
    type Response = {
        data: Circle[],
        recommendCircles: Circle[]
    }
    const { data } = await axiosInstance.get<Response>(
        `${linkConst.CIRCLE.GROUP}/search/${search}`
    )

    return {
        circles: data.data,
        recommendCircles: data.recommendCircles
    }
}
