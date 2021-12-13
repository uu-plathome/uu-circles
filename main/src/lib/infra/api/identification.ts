import { AxiosError } from 'axios'
import { InternalServerError } from './error'
import { linkConst } from './linkConst'
import { axiosInstance } from '.'

/**
 * 識別子が有効かどうかを確認する
 *
 * @returns
 */
export const validIdentification = async ({
  identifierHash,
}: {
  identifierHash: string
}): Promise<boolean> => {
  try {
    await axiosInstance.post<Response>(
      linkConst.IDENTIFICATION.VALID(identifierHash)
    )

    return true
  } catch (_e) {
    const e = _e as AxiosError

    if (e.response && e.response.status === 400) {
      return false
    }

    throw new InternalServerError(
      e.response ? e.response.status : 500,
      e.response ? e.response.statusText : 'Internal Server Error'
    )
  }
}

/**
 * 識別子の発行
 *
 * @returns
 */
export const publishIdentification = async (): Promise<{
  identifierHash: string
}> => {
  type Response = {
    identifierHash: string
  }
  const { data } = await axiosInstance.post<Response>(
    linkConst.IDENTIFICATION.PUBLISH
  )

  return {
    identifierHash: data.identifierHash,
  }
}
