import { axiosInstance } from ".";
import { AxiosError } from 'axios'
import { CreateCircleFormRequest, CreateCircleFormRequestValidationError } from "@/lib/types/api/CreateCircleFormRequest";
import { UpdateCircleFormRequest, UpdateCircleFormRequestValidationError } from "@/lib/types/api/UpdateCircleFormRequest";
import { Circle } from "@/lib/types/model/Circle";

export const createCircle = async (circle: CreateCircleFormRequest, accessToken: string) => {
    try {
        const { data } = await axiosInstance.post('/admin/api/circle', circle, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        return data.data
    } catch (_e) {
        const e = _e as AxiosError<CreateCircleFormRequestValidationError>

        if (e.response && e.response.status === 422 && e.response.data) {
            return  {
                ...e.response.data,
                type: 'CreateCircleFormRequestValidationError'
            } as CreateCircleFormRequestValidationError
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

export const updateCircle = async (id: number, circle: UpdateCircleFormRequest, accessToken: string) => {

    try {
        const { data } = await axiosInstance.put<{
            data: Circle
        }>(`/admin/api/circle/${id}`, circle, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        return data.data
    } catch (_e) {
        const e = _e as AxiosError<UpdateCircleFormRequestValidationError>

        if (e.response && e.response.status === 422 && e.response.data) {
            return  {
                ...e.response.data,
                type: 'UpdateCircleFormRequestValidationError'
            } as UpdateCircleFormRequestValidationError
        }

        console.error(e)
    }
}