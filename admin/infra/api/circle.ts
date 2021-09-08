import { AxiosError } from 'axios'
import { axiosInstance } from '.'
import {
  CreateCircleFormRequest,
  CreateCircleFormRequestValidationError,
} from '@/src/lib/types/api/CreateCircleFormRequest'
import {
  UpdateCircleFormRequest,
  UpdateCircleFormRequestValidationError,
} from '@/src/lib/types/api/UpdateCircleFormRequest'
import { Circle } from '@/src/lib/types/model/Circle'
import { User } from '@/src/lib/types/model/User'

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

/**
 * サークルの削除
 *
 * @param circleId
 */
export const deleteCircle = async (circleId: number) => {
  try {
    await axiosInstance.delete<{
      data: Circle
    }>(`/admin/api/circle/${circleId}`)
  } catch (_e) {
    console.error(_e)
  }
}

/**
 * サークル一覧のXlsxのダウンロード
 */
export const downloadCircleXlsx = async (): Promise<void> => {
  const { data } = await axiosInstance.get(`/admin/api/circle/download`, {
    responseType: 'blob',
  })

  const url = window.URL.createObjectURL(new Blob([data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute(
    'download',
    `circle_${new Date().toISOString().slice(0, 10)}.xlsx`
  )
  document.body.appendChild(link)
  link.click()
}
