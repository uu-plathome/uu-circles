import {
  UpdateCircleFormRequest,
  UpdateCircleFormRequestValidationError,
} from '@/lib/types/api/UpdateCircleFormRequest'
import { Circle } from '@/lib/types/model/Circle'
import { AxiosError } from 'axios'
import { axiosInstance } from '.'

export const getCircleList = async (): Promise<Circle[]> => {
  console.log('getCircleList args none')

  const { data } = await axiosInstance.get<{
    data: Circle[]
  }>(`/circle/api/circle`)

  return data.data
}

export const showCircle = async (id: number): Promise<Circle> => {
  console.log(`showCircle args id=${id}`)

  const { data } = await axiosInstance.get<{
    data: Circle
  }>(`/circle/api/circle/${id}`)

  console.log(`showCircle ret`, data)
  return data.data
}

export const updateCircle = async (
  circleId: number,
  circle: UpdateCircleFormRequest
) => {
  console.log('updateCircle args', {
    circleId,
    circle,
  })

  try {
    const { data } = await axiosInstance.put<{
      data: Circle
    }>(`/admin/api/circle/${circleId}`, circle)

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
