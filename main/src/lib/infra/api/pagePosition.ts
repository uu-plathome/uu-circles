import { AxiosError } from 'axios'
import {
  CreatePagePositionRequest,
  CreatePagePositionRequestValidationError,
} from '../../types/api/CreatePagePositionRequest'
import { axiosInstance } from '.'

/**
 * ページの位置記録
 */
export const createPagePosition = async ({
  identifierHash,
  request,
}: {
  identifierHash: string
  request: CreatePagePositionRequest
}) => {
  type Response = {
    data: boolean
  }

  try {
    // ページの位置記録
    const data = await axiosInstance.post<Response>(
      `/api/page-position?X-IDENTIFIER_HASH=${identifierHash}`,
      request
    )

    return data.data
  } catch (_e) {
    const e = _e as AxiosError<CreatePagePositionRequestValidationError>

    if (e.response && e.response.status === 422 && e.response.data) {
      return {
        ...e.response.data,
        type: 'CreatePagePositionRequestValidationError',
      } as CreatePagePositionRequestValidationError
    }

    console.error(e)
  }
}
