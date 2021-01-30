import { RegisterCircleNewJoyRequest, RegisterCircleNewJoyRequestValidationError } from "@/lib/types/api/RegisterCircleNewJoyRequest"
import { axiosInstance } from "."
import { AxiosError } from 'axios'
import { UpdateCircleNewJoyRequest, UpdateCircleNewJoyRequestValidationError } from "@/lib/types/api/UpdateCircleNewJoyRequest"
import { Circle } from "@/lib/types/model/Circle"
import { CircleNewJoy } from "@/lib/types/model/CircleNewJoy"

export const createCircleNewJoy = async (circleId: number, circle: RegisterCircleNewJoyRequest, accessToken: string) => {
    try {
        const { data } = await axiosInstance.post(`/admin/api/circle/${circleId}/newjoy`, circle, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        return data.data
    } catch (_e) {
        const e = _e as AxiosError<RegisterCircleNewJoyRequestValidationError>

        if (e.response && e.response.status === 422 && e.response.data) {
            return {
                ...e.response.data,
                type: 'RegisterCircleNewJoyRequestValidationError'
            } as RegisterCircleNewJoyRequestValidationError
        }

        console.error(e)
    }
}

export const updateCircleNewJoy = async (
    circleId: number, 
    circleNewJoyId: number,
    circleNewJoy: UpdateCircleNewJoyRequest, 
    accessToken: string
) => {
    try {
        const { data } = await axiosInstance.put(
            `/admin/api/circle/${circleId}/newjoy/${circleNewJoyId}`, 
            circleNewJoy, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        )

        return data.data
    } catch (_e) {
        const e = _e as AxiosError<UpdateCircleNewJoyRequestValidationError>

        if (e.response && e.response.status === 422 && e.response.data) {
            return {
                ...e.response.data,
                type: 'UpdateCircleNewJoyRequestValidationError'
            } as UpdateCircleNewJoyRequestValidationError
        }

        console.error(e)
    }
}

export const getCircleNewJoyList = async (circleId: number, accessToken: string) => {
    const { data } = await axiosInstance.get<{
        circle: Circle,
        circleNewJoys: CircleNewJoy[],
    }>(`/admin/api/circle/${circleId}/newjoy`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    return {
        circle: data.circle,
        circleNewJoys: data.circleNewJoys
    }
}

export const getCircleNewJoy = async (
    circleId: number, 
    circleNewJoyId: number, 
    accessToken: string
) => {
    const { data } = await axiosInstance.get<{
        circle: Circle,
        circleNewJoy: CircleNewJoy,
    }>(`/admin/api/circle/${circleId}/newjoy/${circleNewJoyId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    return {
        circle: data.circle,
        circleNewJoy: data.circleNewJoy
    }
}

export const deleteCircleNewJoy = async (circleId: number, circleNewJoyId: number, accessToken: string) => {
    
    try {
        await axiosInstance.delete<{
            success: true
        }>(
            `/admin/api/circle/${circleId}/newjoy/${circleNewJoyId}`, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        )

        return {
            type: 'Success'
        }
    } catch (_e) {
        console.error(_e)
    }
}
