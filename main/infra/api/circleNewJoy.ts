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
        `${linkConst.CIRCLE.GROUP}/${slug}/newjoy`
    )

    return {
        circle: data.circle,
        pastCircleNewJoys: data.pastCircleNewJoys,
        futureCircleNewJoys: data.futureCircleNewJoys,
        nowCircleNewJoys: data.nowCircleNewJoys,
        todayCircleNewJoys: data.todayCircleNewJoys,
    }
}

export const showCircleNewJoyBySlug = async (slug: string, circleNewJoyId: number) => {
    type Response = {
        /** サークル */ circle: Circle
        /** 新歓詳細 */ circleNewJoy: CircleNewJoy
        /** 新歓開催済み */ pastCircleNewJoys: CircleNewJoy[]
        /** 新歓開催前 */ futureCircleNewJoys: CircleNewJoy[]
        /** 現在開催中 */ nowCircleNewJoys: CircleNewJoy[]
        /** 今日の新歓 */ todayCircleNewJoys: CircleNewJoy[]
    }
    const { data } = await axiosInstance.get<Response>(
        `${linkConst.CIRCLE.GROUP}/${slug}/newjoy/${circleNewJoyId}`
    )

    return {
        /** サークル */ circle: data.circle,
        /** 新歓詳細 */ circleNewJoy: data.circleNewJoy,
        /** 新歓開催済み */ pastCircleNewJoys: data.pastCircleNewJoys,
        /** 新歓開催前 */futureCircleNewJoys: data.futureCircleNewJoys,
        /** 現在開催中 */nowCircleNewJoys: data.nowCircleNewJoys,
        /** 今日の新歓 */todayCircleNewJoys: data.todayCircleNewJoys,
    }
}