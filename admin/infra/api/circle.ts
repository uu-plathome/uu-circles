import { axiosInstance } from ".";
import { AxiosError } from 'axios'
import { Circle, CreateCircle, CreateCircleValidationError } from "./types";

export const createCircle = async (circle: CreateCircle, accessToken: string) => {
    try {
        const { data } = await axiosInstance.post('/admin/api/circle', {
            name: circle.name,
            slug: circle.slug,
            release: false
        } as CreateCircle, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        return data.data
    } catch (_e) {
        const e = _e as AxiosError<CreateCircleValidationError>

        if (e.response && e.response.status === 422 && e.response.data) {
            return  {
                ...e.response.data,
                type: 'createCircleValidationError'
            } as CreateCircleValidationError
        }

        console.error(e)
    }
}

export const getCircleList = async (accessToken: string) => {
    const { data } = await axiosInstance.get<{
        data: Circle[]
    }>('/admin/api/circle', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    return data.data
}

export const showCircle = async (id: number, accessToken: string) => {
    const { data } = await axiosInstance.get<{
        data: Circle
    }>(`/admin/api/circle/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    return data.data
}

export const updateCircle = async (id: number, circle: Circle, accessToken: string) => {
    const { data } = await axiosInstance.put<{
        data: Circle
    }>(`/admin/api/circle/${id}`, circle, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    return data.data
}