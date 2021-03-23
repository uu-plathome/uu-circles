import {
  RegisterCircleUserRequest,
  RegisterCircleUserRequestValidationError,
} from '@/lib/types/api/RegisterCircleUserRequest'
import {
  UpdateCircleUserRequest,
  UpdateCircleUserRequestValidationError,
} from '@/lib/types/api/UpdateCircleUserRequest'
import { Circle } from '@/lib/types/model/Circle'
import { User } from '@/lib/types/model/User'
import { AxiosError } from 'axios'
import { axiosInstance } from '.'

export const getCircleUserList = async (
  circleId: number
): Promise<{
  circle: Circle
  users: User[]
}> => {
  console.log('getCircleList args', { circleId })

  const { data } = await axiosInstance.get<{
    circle: Circle
    data: User[]
  }>(`/circle/api/circle/${circleId}/user`)

  return {
    circle: data.circle,
    users: data.data,
  }
}

export const getCircleUser = async (
  circleId: number,
  userId: number
): Promise<{
  user: User
}> => {
  console.log('getCircleList args', { circleId })

  const { data } = await axiosInstance.get<{
    data: User
  }>(`/circle/api/circle/${circleId}/user/${userId}`)

  return {
    user: data.data,
  }
}

export const createCircleUser = async (
  circleId: number,
  user: RegisterCircleUserRequest
) => {
  console.log('createCircleUser args', {
    circleId,
    user,
  })

  try {
    await axiosInstance.post(`/circle/api/circle/${circleId}/user`, user)

    return {
      type: 'Success',
    }
  } catch (_e) {
    const e = _e as AxiosError<RegisterCircleUserRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'RegisterCircleUserRequestValidationError',
      } as RegisterCircleUserRequestValidationError
    }

    console.error(e)
  }
}

export const updateCircleUser = async (
  circleId: number,
  userId: number,
  user: UpdateCircleUserRequest
) => {
  console.log('updateCircleUser args', {
    circleId,
    userId,
    user,
  })

  try {
    await axiosInstance.put(
      `/circle/api/circle/${circleId}/user/${userId}`,
      user
    )

    return {
      type: 'Success',
    }
  } catch (_e) {
    const e = _e as AxiosError<UpdateCircleUserRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'UpdateCircleUserRequestValidationError',
      } as UpdateCircleUserRequestValidationError
    }

    console.error(e)
  }
}
