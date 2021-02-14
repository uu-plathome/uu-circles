import { axiosInstance } from '.'
import { linkConst } from './linkConst'
import { Circle } from "@/lib/types/model/Circle"
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'

export const getTodayCircleNewJoy = async () => {
    type Response = {
        /** 今日の新歓 */ todayCircleNewJoys: {
            slug: string
            circleNewJoy: CircleNewJoy
        }[]
        /** 新歓開催前 */ futureCircleNewJoys: {
            slug: string
            circleNewJoy: CircleNewJoy
        }[]
    }
    const { data } = await axiosInstance.get<Response>(
        `${linkConst.CIRCLE.GROUP}/newjoy`
    )

    return {
        /** 今日の新歓 */ todayCircleNewJoys: data.todayCircleNewJoys,
        /** 新歓開催前 */ futureCircleNewJoys: data.futureCircleNewJoys,
    }
}

export const getCircleNewJoyBySlug = async (slug: string) => {
    type Response = {
        /** サークル */ circle: Circle
        /** 新歓開催済み */ pastCircleNewJoys: CircleNewJoy[]
        /** 新歓開催前 */ futureCircleNewJoys: CircleNewJoy[]
        /** 現在開催中 */ nowCircleNewJoys: CircleNewJoy[]
        /** 今日の新歓 */ todayCircleNewJoys: CircleNewJoy[]
        /** 今日の新歓(全て) */ allTodayCircleNewJoys: {
            slug: string
            circleNewJoy: CircleNewJoy
        }[]
    }
    const { data } = await axiosInstance.get<Response>(
        `${linkConst.CIRCLE.GROUP}/${slug}/newjoy`
    )

    return {
        /** サークル */ circle: data.circle,
        /** 新歓開催済み */ pastCircleNewJoys: data.pastCircleNewJoys,
        /** 新歓開催前 */ futureCircleNewJoys: data.futureCircleNewJoys,
        /** 現在開催中 */ nowCircleNewJoys: data.nowCircleNewJoys,
        /** 今日の新歓 */ todayCircleNewJoys: data.todayCircleNewJoys,
        /** 今日の新歓(全て) */ allTodayCircleNewJoys: data.allTodayCircleNewJoys,
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
        /** 今日の新歓(全て) */ allTodayCircleNewJoys: {
            slug: string
            circleNewJoy: CircleNewJoy
        }[]
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
        /** 今日の新歓(全て) */ allTodayCircleNewJoys: data.allTodayCircleNewJoys,
    }
}