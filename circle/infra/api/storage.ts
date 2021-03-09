import { CirclePutStorageRequestValidationError } from '@/lib/types/api/CirclePutStorageRequest'
import { AxiosError } from 'axios'
import { axiosInstance } from '.'

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
    const e = _e as AxiosError<CirclePutStorageRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'CirclePutStorageRequestValidationError',
      }
    }

    console.error(e)
  }
}
