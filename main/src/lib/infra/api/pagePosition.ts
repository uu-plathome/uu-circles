import { AxiosError } from 'axios'
import {
  CreatePagePositionRequest,
  CreatePagePositionRequestValidationError,
} from '../../types/api/CreatePagePositionRequest'
import { axiosInstance } from '.'

/**
 * ページの位置記録
 */
type CreatePagePositionResponse = {
  pagePositionHistoryId: number
  createdAt: string
  data: boolean
}
/**
 * ページの位置記録
 */
export const createPagePosition = async ({
  identifierHash,
  request,
}: {
  identifierHash: string
  request: CreatePagePositionRequest
}): Promise<
  CreatePagePositionResponse | CreatePagePositionRequestValidationError
> => {
  type Response = CreatePagePositionResponse

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
