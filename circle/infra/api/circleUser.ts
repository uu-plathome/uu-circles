import { Circle } from '@/lib/types/model/Circle'
import { User } from '@/lib/types/model/User'
import { axiosInstance } from '.'

export const getCircleUserList = async (
  circleId: number
): Promise<{
  circle: Circle
  users: User[]
}> => {
  console.log('getCircleList args', { circleId })

  const { data } = await axiosInstance.get<{
    circle: Circle
    data: User[]
  }>(`/circle/api/circle/${circleId}/user`)

  return {
    circle: data.circle,
    users: data.data,
  }
}
