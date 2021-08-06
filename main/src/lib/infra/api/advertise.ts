import { Advertise } from '@/src/lib/types/model/Advertise'
import { linkConst } from './linkConst'
import { axiosInstance } from '.'

/**
 * 広告の取得
 */
export const getAdvertise = async (): Promise<{
  /** 広告 */ advertises: Advertise[]
  /** トップのカルーセル用の広告 */ mainAdvertises: Advertise[]
}> => {
  type Response = {
    /** 広告 */ advertises: Advertise[]
    /** トップのカルーセル用の広告 */ mainAdvertises: Advertise[]
  }
  const { data } = await axiosInstance.get<Response>(linkConst.ADVERTISE.GET)

  return {
    /** 広告 */ advertises: data.advertises,
    /** トップのカルーセル用の広告 */ mainAdvertises: data.mainAdvertises,
  }
}
