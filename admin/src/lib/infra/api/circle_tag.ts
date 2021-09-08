import { AxiosError } from 'axios'
import { axiosInstance } from '.'
import { CircleTagModel } from '@/src/lib/enum/api/CircleTagModel'
import { CreateOrUpdateCircleTagRequestValidationError } from '@/src/lib/types/api/CreateOrUpdateCircleTagRequest'

export const getCircleTag = async (circleId: number) => {
  type AxiosResponse = {
    circleTag: CircleTagModel[]
  }
  const { data } = await axiosInstance.get<AxiosResponse>(
    `/admin/api/circle/${circleId}/tag`
  )

  return {
    circleTag: data.circleTag,
  }
}

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
