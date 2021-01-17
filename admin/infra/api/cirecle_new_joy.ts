import { RegisterCircleNewJoyRequest, RegisterCircleNewJoyRequestValidationError } from "@/lib/types/api/RegisterCircleNewJoyRequest"
import { axiosInstance } from "."
import { AxiosError } from 'axios'
import { CircleNewJoy } from "./types"

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

export const getCircleNewJoyList = async (circleId: number, accessToken: string) => {
    const { data } = await axiosInstance.get<{
        data: CircleNewJoy[]
    }>(`/admin/api/circle/${circleId}/newjoy`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    return data.data
}