import {
  CreateCircleFormRequest,
  CreateCircleFormRequestValidationError,
} from '@/lib/types/api/CreateCircleFormRequest'
import {
  UpdateCircleFormRequest,
  UpdateCircleFormRequestValidationError,
} from '@/lib/types/api/UpdateCircleFormRequest'
import { Circle } from '@/lib/types/model/Circle'
import { User } from '@/lib/types/model/User'
import { AxiosError } from 'axios'
import { axiosInstance } from '.'

export const createCircle = async (circle: CreateCircleFormRequest) => {
  try {
    const { data } = await axiosInstance.post('/admin/api/circle', circle)

    return data.data
  } catch (_e) {
    const e = _e as AxiosError<CreateCircleFormRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'CreateCircleFormRequestValidationError',
      } as CreateCircleFormRequestValidationError
    }

    console.error(e)
  }
}

type PaginateCircleCursor = {
  'circles.id'?: number
  'circleInformation.updatedAt'?: string
  previos: boolean
  next: boolean
  name?: string
} | null
export const paginateCircleList = async (cursor: PaginateCircleCursor) => {
  const { data } = await axiosInstance.get<{
    data: {
      hasNext: boolean | null
      hasPrevious: boolean | null
      nextCursor: PaginateCircleCursor
      previousCursor: PaginateCircleCursor
      records: Circle[]
    }
  }>('/admin/api/circle/paginate', {
    params: {
      id: cursor['circles.id'],
      updatedAt: cursor['circleInformation.updatedAt'],
      previos: cursor.previos ? 1 : 0,
      next: cursor.next ? 1 : 0,
      name: cursor.name,
    },
  })

  return data.data
}

export const getCircleList = async () => {
  const { data } = await axiosInstance.get<{
    data: Circle[]
  }>('/admin/api/circle')

  return data.data
}

export const showCircle = async (id: number) => {
  const { data } = await axiosInstance.get<{
    data: Circle
  }>(`/admin/api/circle/${id}`)

  return data.data
}

export const updateCircle = async (
  id: number,
  circle: UpdateCircleFormRequest
) => {
  try {
    const { data } = await axiosInstance.put<{
      data: Circle
    }>(`/admin/api/circle/${id}`, circle)

    return data.data
  } catch (_e) {
    const e = _e as AxiosError<UpdateCircleFormRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'UpdateCircleFormRequestValidationError',
      } as UpdateCircleFormRequestValidationError
    }

    console.error(e)
  }
}

/**
 * ユーザーに紐づくサークルを取得する
 *
 * @param userId
 */
export const getCircleListByUserId = async (userId: number) => {
  const { data } = await axiosInstance.get<{
    circles: Circle[]
    user: User
  }>(`/admin/api/circle-user/${userId}`)

  return {
    circles: data.circles,
    user: data.user,
  }
}

export const deleteCircle = async (circleId: number) => {
  try {
    await axiosInstance.delete<{
      data: Circle
    }>(`/admin/api/circle/${circleId}`)
  } catch (_e) {
    console.error(_e)
  }
}
