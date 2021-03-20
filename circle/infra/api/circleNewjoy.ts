import {
  RegisterCircleNewJoyRequest,
  RegisterCircleNewJoyRequestValidationError,
} from '@/lib/types/api/RegisterCircleNewJoyRequest'
import {
  UpdateCircleNewJoyRequest,
  UpdateCircleNewJoyRequestValidationError,
} from '@/lib/types/api/UpdateCircleNewJoyRequest'
import { Circle } from '@/lib/types/model/Circle'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { AxiosError } from 'axios'
import { axiosInstance } from '.'

export const createCircleNewJoy = async (
  circleId: number,
  circle: RegisterCircleNewJoyRequest
) => {
  try {
    const { data } = await axiosInstance.post(
      `/circle/api/circle/${circleId}/newjoy`,
      circle
    )

    return data.data
  } catch (_e) {
    const e = _e as AxiosError<RegisterCircleNewJoyRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'RegisterCircleNewJoyRequestValidationError',
      } as RegisterCircleNewJoyRequestValidationError
    }

    console.error(e)
  }
}

export const updateCircleNewJoy = async (
  circleId: number,
  circleNewJoyId: number,
  circleNewJoy: UpdateCircleNewJoyRequest
) => {
  console.log('updateCircleNewJoy args', {
    circleId,
    circleNewJoyId,
    circleNewJoy,
  })
  try {
    const { data } = await axiosInstance.put(
      `/circle/api/circle/${circleId}/newjoy/${circleNewJoyId}`,
      circleNewJoy
    )

    return data.data
  } catch (_e) {
    const e = _e as AxiosError<UpdateCircleNewJoyRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'UpdateCircleNewJoyRequestValidationError',
      } as UpdateCircleNewJoyRequestValidationError
    }

    console.error(e)
  }
}

export const getCircleNewJoyList = async (circleId: number) => {
  const { data } = await axiosInstance.get<{
    circle: Circle
    circleNewJoys: CircleNewJoy[]
  }>(`/circle/api/circle/${circleId}/newjoy`)

  return {
    circle: data.circle,
    circleNewJoys: data.circleNewJoys,
  }
}

export const getCircleNewJoy = async (
  circleId: number,
  circleNewJoyId: number
) => {
  const { data } = await axiosInstance.get<{
    circle: Circle
    circleNewJoy: CircleNewJoy
  }>(`/circle/api/circle/${circleId}/newjoy/${circleNewJoyId}`)

  return {
    circle: data.circle,
    circleNewJoy: data.circleNewJoy,
  }
}

export const deleteCircleNewJoy = async (
  circleId: number,
  circleNewJoyId: number
) => {
  try {
    await axiosInstance.delete<{
      success: true
    }>(`/circle/api/circle/${circleId}/newjoy/${circleNewJoyId}`)

    return {
      type: 'Success',
    } as {
      type: 'Success'
    }
  } catch (_e) {
    console.error(_e)
  }
}
