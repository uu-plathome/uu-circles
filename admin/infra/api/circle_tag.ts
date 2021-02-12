import { CircleTagModel } from '@/lib/enum/api/CircleTagModel'
import { CreateOrUpdateCircleTagRequestValidationError } from '@/lib/types/api/CreateOrUpdateCircleTagRequest'
import { AxiosError } from 'axios'
import { axiosInstance } from '.'

export const createOrUpdateCircleTag = async (
  circleId: number,
  circleTag: CircleTagModel[]
) => {
  try {
    await axiosInstance.post(`/admin/api/circle/${circleId}/tag`, {
      circleTag,
    })

    return {
      type: 'success',
    } as {
      type: 'success'
    }
  } catch (_e) {
    const e = _e as AxiosError<CreateOrUpdateCircleTagRequestValidationError>

    if (e.response && e.response.status === 422) {
      return {
        ...e.response.data,
        type: 'CreateOrUpdateCircleTagRequestValidationError',
      } as CreateOrUpdateCircleTagRequestValidationError
    }

    console.error(e)
  }
}
