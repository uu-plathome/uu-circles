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
  circleNewjoy: RegisterCircleNewJoyRequest
) => {
  console.log('createCircleNewJoy args', {
    circleId,
    circleNewjoy,
  })

  try {
    const { data } = await axiosInstance.post(
      `/circle/api/circle/${circleId}/newjoy`,
      circleNewjoy
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

export const getCircleNewJoyList = async (
  circleId: number
): Promise<{
  circle: Circle
  /** 未来の公開中の新歓一覧 */ onReleaseFuture: CircleNewJoy[]
  /** 過去の公開中の新歓一覧 */ onReleasePast: CircleNewJoy[]
  /** 未来の非公開の新歓一覧 */ onPrivateFuture: CircleNewJoy[]
  /** 過去の非公開の新歓一覧 */ onPrivatePast: CircleNewJoy[]
}> => {
  console.log('getCircleNewJoyList args', {
    circleId,
  })

  const { data } = await axiosInstance.get<{
    circle: Circle
    /** 未来の公開中の新歓一覧 */ onReleaseFuture: CircleNewJoy[]
    /** 過去の公開中の新歓一覧 */ onReleasePast: CircleNewJoy[]
    /** 未来の非公開の新歓一覧 */ onPrivateFuture: CircleNewJoy[]
    /** 過去の非公開の新歓一覧 */ onPrivatePast: CircleNewJoy[]
  }>(`/circle/api/circle/${circleId}/newjoy`)

  return {
    circle: data.circle,
    /** 未来の公開中の新歓一覧 */ onReleaseFuture: data.onReleaseFuture,
    /** 過去の公開中の新歓一覧 */ onReleasePast: data.onReleasePast,
    /** 未来の非公開の新歓一覧 */ onPrivateFuture: data.onPrivateFuture,
    /** 過去の非公開の新歓一覧 */ onPrivatePast: data.onPrivatePast,
  }
}

export const getCircleNewJoy = async (
  circleId: number,
  circleNewJoyId: number
) => {
  console.log('getCircleNewJoy args', {
    circleId,
    circleNewJoyId,
  })

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
  console.log('deleteCircleNewJoy args', {
    circleId,
    circleNewJoyId,
  })

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
