import { Circle } from '@/lib/types/model/Circle'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { axiosInstance } from '.'
import { linkConst } from './linkConst'

export const getAllCircleList = async () => {
    type Response = {
        data: Circle[]
    }
    const { data } = await axiosInstance.get<Response>(
        `${linkConst.CIRCLE.GROUP}`
    )

    return {
        circles: data.data
    }
}

export const getCircleBySlug = async (slug: string) => {
    type Response = {
        data: Circle
        circleNewJoys: CircleNewJoy[]
    }
    const { data } = await axiosInstance.get<Response>(
        `${linkConst.CIRCLE.GROUP}/${slug}`
    )

    return {
        circle: data.data,
        circleNewJoys: data.circleNewJoys
    }
}

export const getCircleByCategory = async (category: string) => {
    type Response = {
        data: Circle[]
    }
    const { data } = await axiosInstance.get<Response>(
        `${linkConst.CIRCLE.GROUP}/category/${category}`
    )

    return {
        circles: data.data
    }
}

export const getCircleByTag = async (tag: string) => {
    type Response = {
        data: Circle[]
    }
    const { data } = await axiosInstance.get<Response>(
        `${linkConst.CIRCLE.GROUP}/tag/${tag}`
    )

    return {
        circles: data.data
    }
}