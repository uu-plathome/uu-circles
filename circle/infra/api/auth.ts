import {
  LoginCircleFormRequest,
  LoginCircleFormRequestValidationError,
} from '@/lib/types/api/LoginCircleFormRequest'
import { VerificationEmailCircleUserRequestValidationError } from '@/lib/types/api/VerificationEmailCircleUserRequest'
import { VerificationResendCircleUserFormRequestValidationError } from '@/lib/types/api/VerificationResendCircleUserFormRequest'
import { User } from '@/lib/types/model/User'
import { AxiosError } from 'axios'
import { axiosInstance } from '.'

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
    const e = _e as AxiosError<VerificationResendCircleUserFormRequestValidationError>

    if (e.response && e.response.status === 422) {
      return {
        ...e.response.data,
        type: 'VerificationResendCircleUserFormRequestValidationError',
      } as VerificationResendCircleUserFormRequestValidationError
    }

    console.error(e)
  }
}
