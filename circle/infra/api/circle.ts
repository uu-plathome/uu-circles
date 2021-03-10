import { Circle } from '@/lib/types/model/Circle'
import { axiosInstance } from '.'

export const getCircleList = async (): Promise<Circle[]> => {
  const { data } = await axiosInstance.get<{
    data: Circle[]
  }>(`/circle/api/circle`)

  return data.data
}

export const showCircle = async (id: number): Promise<Circle> => {
  const { data } = await axiosInstance.get<{
    data: Circle
  }>(`/circle/api/circle/${id}`)

  return data.data
}
