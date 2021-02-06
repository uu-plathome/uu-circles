import { CreateAdvertiseRequest, CreateAdvertiseRequestValidationError } from "@/lib/types/api/CreateAdvertiseRequest"
import { UpdateAdvertiseRequest, UpdateAdvertiseRequestValidationError } from "@/lib/types/api/UpdateAdvertiseRequest"
import { Advertise } from "@/lib/types/model/Advertise"
import { AxiosError } from "axios"
import { axiosInstance } from "."

/**
 * 広告一覧
 */
export const getAdvertiseList = async () => {
    const { data } = await axiosInstance.get<{
        data: Advertise[]
    }>('/admin/api/advertise')

    return data.data
}

/**
 * 広告の取得
 * 
 * @param advertiseId 
 */
export const showAdvertise = async (advertiseId: number) => {
    const { data } = await axiosInstance.get<{
        data: Advertise
    }>(`/admin/api/advertise/${advertiseId}`)

    return data.data
}

/**
 * 広告の作成
 * 
 * @param advertise 
 */
export const createAdvertise = async (advertise: CreateAdvertiseRequest) => {
    try {
        const { data } = await axiosInstance.post('/admin/api/advertise', advertise)

        return data.data
    } catch (_e) {
        const e = _e as AxiosError<CreateAdvertiseRequestValidationError>

        if (e.response && e.response.status === 422 && e.response.data) {
            return  {
                ...e.response.data,
                type: 'CreateAdvertiseRequestValidationError'
            } as CreateAdvertiseRequestValidationError
        }

        console.error(e)
    }
}

/**
 * 広告の更新
 * 
 * @param advertiseId 
 * @param advertise 
 */
export const updateAdvertise = async (advertiseId: number, advertise: UpdateAdvertiseRequest) => {
    try {
        const { data } = await axiosInstance.put(`/admin/api/advertise/${advertiseId}`, advertise)

        return data.data
    } catch (_e) {
        const e = _e as AxiosError<UpdateAdvertiseRequestValidationError>

        if (e.response && e.response.status === 422 && e.response.data) {
            return  {
                ...e.response.data,
                type: 'UpdateAdvertiseRequestValidationError'
            } as UpdateAdvertiseRequestValidationError
        }

        console.error(e)
    }
}

/**
 * 広告の削除
 * 
 * @param advertiseId 
 */
export const deleteAdvertise = async (advertiseId: number) => {
    try {
        await axiosInstance.delete<{
            success: true
        }>(
            `/admin/api/advertise/${advertiseId}`
        )

        return {
            type: 'Success'
        } as {
            type: 'Success'
        }
    } catch (_e) {
        console.error(_e)
    }
}