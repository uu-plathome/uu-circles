import { AxiosError } from 'axios'
import { axiosInstance } from '.'
import {
  RegisterAdminFormRequest,
  RegisterAdminFormRequestValidationError,
} from '@/src/lib/types/api/RegisterAdminFormRequest'
import {
  UpdateAdminUserRequest,
  UpdateAdminUserRequestValidationError,
} from '@/src/lib/types/api/UpdateAdminUserRequest'
import { User } from '@/src/lib/types/model/User'

export const getAdminUserList = async () => {
  const { data } = await axiosInstance.get<{
    data: User[]
  }>('/admin/api/admin-user')

  return data.data
}

export const createAdminUser = async (user: RegisterAdminFormRequest) => {
  try {
    const { data } = await axiosInstance.post('/admin/api/admin-user', user)

    return data.data
  } catch (_e) {
    const e = _e as AxiosError<RegisterAdminFormRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'RegisterAdminFormRequestValidationError',
      } as RegisterAdminFormRequestValidationError
    }

    console.error(e)
  }
}

export const deleteAdminUser = async (userId: number) => {
  try {
    const { data } = await axiosInstance.delete(
      `/admin/api/admin-user/${userId}`
    )

    return {
      type: 'success',
      data: data.data,
    } as {
      type: 'success'
      data: string
    }
  } catch (_e) {
    const e = _e as AxiosError<{
      errors: {
        data?: string
      }
      message: string
      type: 'DeleteAdminUserValidationError'
    }>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'DeleteAdminUserValidationError',
      } as {
        errors: {
          data?: string
        }
        message: string
        type: 'DeleteAdminUserValidationError'
      }
    }

    console.error(e)
  }
}

export const updateAdminUser = async (
  userId: number,
  user: UpdateAdminUserRequest
) => {
  try {
    const { data } = await axiosInstance.put<{
      data: User[]
    }>(`/admin/api/admin-user/${userId}`, user)

    return {
      ...data.data,
      type: 'Success',
    }
  } catch (_e) {
    const e = _e as AxiosError<UpdateAdminUserRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'UpdateAdminUserRequestValidationError',
      } as UpdateAdminUserRequestValidationError
    }

    console.error(e)
  }
}

export const getAdminUser = async (userId: number) => {
  const { data } = await axiosInstance.get<{
    data: User
  }>(`/admin/api/admin-user/${userId}`)

  return data.data
}
