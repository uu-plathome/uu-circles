import { AxiosError } from 'axios'
import { axiosInstance } from '.'
import {
  ImportCircleUserRequest,
  ImportCircleUserRequestValidationError,
} from '@/lib/types/api/ImportCircleUserRequest'
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

/**
 * 部員アカウント一覧を取得
 *
 * @param circleId
 * @returns
 */
export const getCircleUserList = async (
  circleId: number
): Promise<{
  circle: Circle
  /** 認証済みの部員アカウント一覧 */ circleUsersDoneEmailVerify: User[]
  /** 未認証の部員アカウント一覧 */ circleUsersNotDoneEmailVerify: User[]
}> => {
  console.log('getCircleList args', { circleId })

  const { data } = await axiosInstance.get<{
    circle: Circle
    /** 認証済みの部員アカウント一覧 */ circleUsersDoneEmailVerify: User[]
    /** 未認証の部員アカウント一覧 */ circleUsersNotDoneEmailVerify: User[]
  }>(`/circle/api/circle/${circleId}/user`)

  return {
    circle: data.circle,
    /** 認証済みの部員アカウント一覧 */
    circleUsersDoneEmailVerify: data.circleUsersDoneEmailVerify,
    /** 未認証の部員アカウント一覧 */
    circleUsersNotDoneEmailVerify: data.circleUsersNotDoneEmailVerify,
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

export const importCircleUser = async (
  circleId: number,
  userId: number,
  user: ImportCircleUserRequest
) => {
  console.log('importCircleUser args', {
    circleId,
    userId,
    user,
  })

  try {
    await axiosInstance.post(
      `/circle/api/circle/${circleId}/user/${userId}`,
      user
    )

    return {
      type: 'Success',
    }
  } catch (_e) {
    const e = _e as AxiosError<ImportCircleUserRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'ImportCircleUserRequestValidationError',
      } as ImportCircleUserRequestValidationError
    }

    console.error(e)
  }
}

export const searchCircleUser = async (
  circleId: number,
  searchText: string
) => {
  console.log('searchCircleUser args', { circleId })

  const { data } = await axiosInstance.get<{
    data: User[]
  }>(`/circle/api/circle/${circleId}/user/search/${searchText}`)

  return {
    users: data.data,
  }
}
