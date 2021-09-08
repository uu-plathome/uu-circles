import { AxiosError } from 'axios'
import { axiosInstance } from './index'
import {
  RegisterCircleUserRequest,
  RegisterCircleUserRequestValidationError,
} from '@/src/lib/types/api/RegisterCircleUserRequest'
import {
  UpdateCircleUserRequest,
  UpdateCircleUserRequestValidationError,
} from '@/src/lib/types/api/UpdateCircleUserRequest'
import { VerificationEmailCircleUserRequestValidationError } from '@/src/lib/types/api/VerificationEmailCircleUserRequest'
import { VerificationInvalidError } from '@/src/lib/types/api/VerificationInvalidError'
import { VerificationResendCircleUserFormRequestValidationError } from '@/src/lib/types/api/VerificationResendCircleUserFormRequest'
import { User, UserByAllCircle } from '@/src/lib/types/model/User'

export const createCircleUser = async (
  circleId: number,
  user: RegisterCircleUserRequest
) => {
  try {
    const { data } = await axiosInstance.post<{
      data: User[]
    }>(`/admin/api/circle/${circleId}/user`, user)

    return {
      ...data.data,
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

export const deleteCircleUser = async (
  circleId: number,
  circleUserId: number
) => {
  try {
    await axiosInstance.delete<{
      success: true
    }>(`/admin/api/circle/${circleId}/user/${circleUserId}`)

    return {
      type: 'Success',
    }
  } catch (_e) {
    console.error(_e)
  }
}

export const getCircleUser = async ({
  circleId,
  userId,
}: {
  circleId: number
  userId: number
}) => {
  const { data } = await axiosInstance.get<{
    data: User
  }>(`/admin/api/circle/${circleId}/user/${userId}`)

  return data.data
}

export const updateCircleUser = async (
  circleId: number,
  userId: number,
  user: UpdateCircleUserRequest
) => {
  try {
    const { data } = await axiosInstance.put<{
      data: User[]
    }>(`/admin/api/circle/${circleId}/user/${userId}`, user)

    return {
      ...data.data,
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

export const getCircleUserList = async (circleId: number) => {
  const { data } = await axiosInstance.get<{
    data: User[]
  }>(`/admin/api/circle/${circleId}/user`)

  return {
    users: data.data,
  }
}

export const checkVerifyCircleUser = async (
  id: number,
  expires: string,
  signature: string
) => {
  try {
    const { data } = await axiosInstance.get<{
      status: boolean
    }>(`/circle/api/email/verify/${id}`, {
      params: {
        expires,
        signature,
      },
    })

    return {
      ...data,
      type: 'success',
    } as {
      status: boolean
      type: 'success'
    }
  } catch (_e) {
    const e = _e as AxiosError<VerificationInvalidError>

    if (e.response && e.response.status === 400) {
      return {
        ...e.response.data,
        type: 'VerificationInvalidError',
      } as VerificationInvalidError
    }

    console.error(e)
  }
}

export const verificationEmailCircleUser = async (
  id: number,
  password: string,
  expires: string,
  signature: string
) => {
  try {
    const { data } = await axiosInstance.post<{
      status: boolean
    }>(
      `/circle/api/email/verify/${id}`,
      {
        password,
      },
      {
        params: {
          expires,
          signature,
        },
      }
    )

    return {
      ...data,
      type: 'success',
    } as {
      status: boolean
      type: 'success'
    }
  } catch (_e) {
    const e = _e as AxiosError<
      | VerificationInvalidError
      | VerificationEmailCircleUserRequestValidationError
    >

    if (e.response && e.response.status === 400) {
      return {
        ...e.response.data,
        type: 'VerificationInvalidError',
      } as VerificationInvalidError
    }

    if (e.response && e.response.status === 422) {
      return {
        ...e.response.data,
        type: 'VerificationEmailCircleUserRequestValidationError',
      } as VerificationEmailCircleUserRequestValidationError
    }

    console.error(e)
  }
}

export const resendEmailCircleUser = async (email: string) => {
  try {
    const { data } = await axiosInstance.post<{
      status: boolean
    }>(`/admin/api/email/resend`, {
      email,
    })

    return {
      ...data,
      type: 'success',
    } as {
      status: boolean
      type: 'success'
    }
  } catch (_e) {
    const e =
      _e as AxiosError<VerificationResendCircleUserFormRequestValidationError>

    if (e.response && e.response.status === 422) {
      return {
        ...e.response.data,
        type: 'VerificationResendCircleUserFormRequestValidationError',
      } as VerificationResendCircleUserFormRequestValidationError
    }

    console.error(e)
  }
}

export const createRelationBetweenUserAndCircle = async (
  userId: number,
  circleId: number
) => {
  type ValidationError = {
    type: 'ValidationError'
    errors: {
      data: string
    }
    message: string
  }

  try {
    await axiosInstance.post(`/admin/api/circle-user/${userId}/${circleId}`)

    return {
      type: 'success',
    } as {
      type: 'success'
    }
  } catch (_e) {
    const e = _e as AxiosError<ValidationError>

    if (e.response && e.response.status === 422) {
      return {
        ...e.response.data,
        type: 'ValidationError',
      } as ValidationError
    }

    console.error(e)
  }
}

export const deleteRelationBetweenUserAndCircle = async (
  userId: number,
  circleId: number
) => {
  type ValidationError = {
    type: 'ValidationError'
    errors: {
      data: string
    }
    message: string
  }

  try {
    await axiosInstance.delete(`/admin/api/circle-user/${userId}/${circleId}`)

    return {
      type: 'success',
    } as {
      type: 'success'
    }
  } catch (_e) {
    const e = _e as AxiosError<ValidationError>

    if (e.response && e.response.status === 422) {
      return {
        ...e.response.data,
        type: 'ValidationError',
      } as ValidationError
    }

    console.error(e)
  }
}

export const allCircleUserList = async (): Promise<{
  data: {
    users: UserByAllCircle[]
  }
}> => {
  const { data } = await axiosInstance.get<{
    data: {
      users: UserByAllCircle[]
    }
  }>('/admin/api/user/circle')

  return {
    data: data.data,
  }
}
