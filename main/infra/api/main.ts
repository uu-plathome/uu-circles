import { Advertise } from '@/lib/types/model/Advertise'
import { Circle } from '@/lib/types/model/Circle'
import { axiosInstance } from '.'
import { linkConst } from './linkConst'

export const getMain = async () => {
  type Response = {
    data: Circle[]
    advertises: Advertise[]
    mainAdvertises: Advertise[]
  }
  const { data } = await axiosInstance.get<Response>(linkConst.MAIN.INDEX)

  return {
    circles: data.data,
    advertises: data.advertises,
    mainAdvertises: data.mainAdvertises
  }
}
