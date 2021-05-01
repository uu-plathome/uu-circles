import { Advertise } from '@/lib/types/model/Advertise'
import { Circle } from '@/lib/types/model/Circle'
import { WP_REST_API_Post } from 'wp-types'
import { linkConst } from './linkConst'
import { axiosInstance } from '.'

export const getMain = async (): Promise<{
  circles: Circle[]
  advertises: Advertise[]
  mainAdvertises: Advertise[]
  uuYellArticles: WP_REST_API_Post[]
}> => {
  type Response = {
    data: Circle[]
    advertises: Advertise[]
    mainAdvertises: Advertise[]
    uuYellArticles: WP_REST_API_Post[]
  }
  const { data } = await axiosInstance.get<Response>(linkConst.MAIN.INDEX)

  return {
    circles: data.data,
    advertises: data.advertises,
    mainAdvertises: data.mainAdvertises,
    uuYellArticles: data.uuYellArticles,
  }
}
