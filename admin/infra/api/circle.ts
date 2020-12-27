import { axiosInstance } from ".";
import { Circle, CreateCircle } from "./types";

export const createCircle = async (circle: CreateCircle, accessToken: string) => {
    await axiosInstance.post('/circle', {
        slug: circle.slug,
        release: false
    } as CreateCircle, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
}

export const getCircleList = async (accessToken: string) => {
    const { data } = await axiosInstance.get<{
        data: Circle[]
    }>('/circle', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    return data.data
}