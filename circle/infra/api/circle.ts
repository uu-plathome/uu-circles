import { Circle } from '@/lib/types/model/Circle'
import { axiosInstance } from '.'

export const showCircle = async (id: number) => {
  const { data } = await axiosInstance.get<{
    data: Circle
  }>(`/circle/api/circle/${id}`)

  return data.data
}
