import { AxiosError } from 'axios'
import { axiosInstance } from '.'
import {
  ForgotPasswordCircleRequest,
  ForgotPasswordCircleRequestValidationError,
} from '@/src/lib/types/api/ForgotPasswordCircleRequest'
import {
  LoginCircleFormRequest,
  LoginCircleFormRequestValidationError,
} from '@/src/lib/types/api/LoginCircleFormRequest'
import {
  ResetPasswordCircleRequest,
  ResetPasswordCircleRequestValidationError,
} from '@/src/lib/types/api/ResetPasswordCircleRequest'
import {
  UpdateOwnUserRequest,
  UpdateOwnUserRequestValidationError,
} from '@/src/lib/types/api/UpdateOwnUserRequest'
import { VerificationEmailCircleUserRequestValidationError } from '@/src/lib/types/api/VerificationEmailCircleUserRequest'
import { VerificationResendCircleUserFormRequestValidationError } from '@/src/lib/types/api/VerificationResendCircleUserFormRequest'
import { User } from '@/src/lib/types/model/User'

/**
 * ログイン
 *
 * @param { LoginCircleFormRequest } request
 * @returns
 */
export const login = async (request: LoginCircleFormRequest) => {
  try {
    const { data } = await axiosInstance.post<User>(
      '/circle/api/login',
      request
    )

    return {
      ...data,
      type: 'User',
    } as User
  } catch (_e) {
    type ValidationError = {
      type: 'ValidationError'
      errors: {
        data?: string
      }
      message: string
    }
    const e = _e as
      | AxiosError<LoginCircleFormRequestValidationError>
      | AxiosError<ValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      if (
        e.response.data.errors &&
        typeof (e as AxiosError<ValidationError>).response.data.errors.data ===
          'string'
      ) {
        return {
          ...e.response.data,
          type: 'ValidationError',
        } as ValidationError
      }

      return {
        ...e.response.data,
        type: 'LoginCircleFormRequestValidationError',
      } as LoginCircleFormRequestValidationError & {
        errors: {
          data: string[]
        }
      }
    }

    console.error(e)
  }
}

/**
 * ログアウト
 *
 * @returns
 */
export const logout = async () => {
  console.log('logout')
  try {
    await axiosInstance.post<User>('/circle/api/logout')

    return {
      data: 'Success',
    }
  } catch (_e) {
    console.error(_e)
  }
}

export const checkVerifyCircleUser = async (
  id: number,
  expires: string,
  signature: string
) => {
  type VerificationInvalidError = {
    status: string
    type: 'VerificationInvalidError'
  }

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
  type VerificationInvalidError = {
    status: string
    type: 'VerificationInvalidError'
  }

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
    }>(`/circle/api/email/resend`, {
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

export const updateUser = async (user: UpdateOwnUserRequest) => {
  console.log('updateUser args', {
    user,
  })

  try {
    const { data } = await axiosInstance.put<{
      data: User
    }>(`/circle/api/user`, user)

    console.log('updateUser ret', {
      data,
    })

    return data.data
  } catch (_e) {
    const e = _e as AxiosError<UpdateOwnUserRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'UpdateOwnUserRequestValidationError',
      } as UpdateOwnUserRequestValidationError
    }

    console.error(e)
  }
}

/**
 * Passwordを変更するためのメールを送信する
 *
 * @param email
 */
export const forgotPassword = async (email: string) => {
  try {
    const { data } = await axiosInstance.post<{
      status: string
    }>(`/circle/api/password/reset`, {
      email,
    } as ForgotPasswordCircleRequest)

    return {
      ...data,
      type: 'success',
    } as {
      status: string
      type: 'success'
    }
  } catch (_e) {
    const e = _e as AxiosError<ForgotPasswordCircleRequestValidationError>

    if (e.response && e.response.status === 422) {
      return {
        ...e.response.data,
        type: 'ForgotPasswordCircleRequestValidationError',
      } as ForgotPasswordCircleRequestValidationError
    }

    console.error(e)
  }
}

/**
 * Passwordを変更するためのメールを送信する
 *
 * @param email
 */
export const resetPassword = async (request: ResetPasswordCircleRequest) => {
  try {
    const { data } = await axiosInstance.post<{
      status: string
    }>(`/circle/api/password/confirm`, request)

    return {
      ...data,
      type: 'success',
    } as {
      status: string
      type: 'success'
    }
  } catch (_e) {
    const e = _e as AxiosError<ResetPasswordCircleRequestValidationError>

    if (e.response && e.response.status === 422) {
      return {
        ...e.response.data,
        type: 'ResetPasswordCircleRequestValidationError',
      } as ResetPasswordCircleRequestValidationError
    }

    console.error(e)
  }
}
