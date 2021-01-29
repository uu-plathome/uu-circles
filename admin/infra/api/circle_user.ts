import { RegisterCircleUserRequest, RegisterCircleUserRequestValidationError } from '@/lib/types/api/RegisterCircleUserRequest'
import { AxiosError } from 'axios'
import { axiosInstance } from './index'
import { User } from './types'

export const createCircleUser = async (circleId: number, user: RegisterCircleUserRequest, accessToken: string) => {
    
    try {
        const { data } = await axiosInstance.post<{
            data: User[]
        }>(
            `/admin/api/circle/${circleId}/user`, 
            user,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        )

        return data.data
    } catch (_e) {
        const e = _e as AxiosError<RegisterCircleUserRequestValidationError>

        if (e.response && e.response.status === 422 && e.response.data) {
            return  {
                ...e.response.data,
                type: 'RegisterCircleUserRequestValidationError'
            } as RegisterCircleUserRequestValidationError
        }

        console.error(e)
    }
}

export const getCircleUserList = async (circleId: number, accessToken: string) => {
    const { data } = await axiosInstance.get<{
        data: User[],
    }>(`/admin/api/circle/${circleId}/user`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    return {
        users: data.data,
    }
}