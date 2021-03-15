import { Circle } from '@/lib/types/model/Circle'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { axiosInstance } from '.'

export const getCircleNewJoyList = async (circleId: number) => {
  const { data } = await axiosInstance.get<{
    circle: Circle
    circleNewJoys: CircleNewJoy[]
  }>(`/admin/api/circle/${circleId}/newjoy`)

  return {
    circle: data.circle,
    circleNewJoys: data.circleNewJoys,
  }
}
