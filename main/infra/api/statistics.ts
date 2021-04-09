import { Statistics } from '@/lib/types/model/Statistics'
import { linkConst } from './linkConst'
import { axiosInstance } from '.'

/**
 * 統計情報取得API
 */
export const getStatistics = async (): Promise<Statistics> => {
  type Response = {
    statistics: Statistics
  }
  const { data } = await axiosInstance.get<Response>(linkConst.STATISTICS.INDEX)

  return data.statistics
}
