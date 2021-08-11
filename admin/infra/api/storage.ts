import { AxiosError } from 'axios'
import { axiosInstance } from '.'
import { AdminPutStorageRequestValidationError } from '@/lib/types/api/AdminPutStorageRequest'

export const putStorage = async (file: Blob | string) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await axiosInstance.post<{
      url: string
    }>('/admin/api/storage', formData)

    return {
      url: data.url,
      type: 'Success',
    }
  } catch (_e) {
    const e = _e as AxiosError<AdminPutStorageRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'AdminPutStorageRequestValidationError',
      }
    }

    console.error(e)
  }
}
