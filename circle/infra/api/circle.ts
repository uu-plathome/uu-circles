import {
  UpdateCircleFormRequest,
  UpdateCircleFormRequestValidationError,
} from '@/lib/types/api/UpdateCircleFormRequest'
import { Circle } from '@/lib/types/model/Circle'
import { AxiosError } from 'axios'
import { axiosInstance } from '.'

export const getCircleList = async (): Promise<Circle[]> => {
  const { data } = await axiosInstance.get<{
    data: Circle[]
  }>(`/circle/api/circle`)

  return data.data
}

export const showCircle = async (id: number): Promise<Circle> => {
  const { data } = await axiosInstance.get<{
    data: Circle
  }>(`/circle/api/circle/${id}`)

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
