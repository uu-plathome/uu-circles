import { AxiosError } from 'axios'
import { axiosInstance } from '.'
import {
  RegisterCircleNewJoyRequest,
  RegisterCircleNewJoyRequestValidationError,
} from '@/src/lib/types/api/RegisterCircleNewJoyRequest'
import {
  UpdateCircleNewJoyRequest,
  UpdateCircleNewJoyRequestValidationError,
} from '@/src/lib/types/api/UpdateCircleNewJoyRequest'
import { Circle } from '@/src/lib/types/model/Circle'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'

export const createCircleNewJoy = async (
  circleId: number,
  circle: RegisterCircleNewJoyRequest
) => {
  try {
    const { data } = await axiosInstance.post(
      `/admin/api/circle/${circleId}/newjoy`,
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
  try {
    const { data } = await axiosInstance.put(
      `/admin/api/circle/${circleId}/newjoy/${circleNewJoyId}`,
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
    circleNewJoys: {
      circleId: number
      name: string
      circleNewJoy: CircleNewJoy
    }[]
  }>(`/admin/api/circle/${circleId}/newjoy`)

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
  }>(`/admin/api/circle/${circleId}/newjoy/${circleNewJoyId}`)

  return {
    circle: data.circle,
    circleNewJoy: data.circleNewJoy,
  }
}

export const copyCircleNewJoy = async (
  circleId: number,
  circleNewJoyId: number
) => {
  try {
    await axiosInstance.post(
      `/admin/api/circle/${circleId}/newjoy/${circleNewJoyId}/copy`,
      {}
    )

    return {
      type: 'Success',
    } as {
      type: 'Success'
    }
  } catch (_e) {
    console.error(_e)
  }
}

export const deleteCircleNewJoy = async (
  circleId: number,
  circleNewJoyId: number
) => {
  try {
    await axiosInstance.delete<{
      success: true
    }>(`/admin/api/circle/${circleId}/newjoy/${circleNewJoyId}`)

    return {
      type: 'Success',
    } as {
      type: 'Success'
    }
  } catch (_e) {
    console.error(_e)
  }
}
