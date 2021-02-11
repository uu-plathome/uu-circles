import { axiosInstance } from '.'
import { linkConst } from './linkConst'
import { Circle } from "@/lib/types/model/Circle"
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'

export const getCircleNewJoyBySlug = async (slug: string) => {
    type Response = {
        circle: Circle
        pastCircleNewJoys: CircleNewJoy[]
        futureCircleNewJoys: CircleNewJoy[]
        nowCircleNewJoys: CircleNewJoy[]
        todayCircleNewJoys: CircleNewJoy[]
    }
    const { data } = await axiosInstance.get<Response>(
        `${linkConst.NEWJOY.GROUP}/${slug}`
    )

    return {
        circle: data.circle,
        pastCircleNewJoys: data.pastCircleNewJoys,
        futureCircleNewJoys: data.futureCircleNewJoys,
        nowCircleNewJoys: data.nowCircleNewJoys,
        todayCircleNewJoys: data.todayCircleNewJoys,
    }
}