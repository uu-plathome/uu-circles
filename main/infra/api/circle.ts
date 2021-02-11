import { Circle } from '@/lib/types/model/Circle'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { axiosInstance } from '.'
import { linkConst } from './linkConst'

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