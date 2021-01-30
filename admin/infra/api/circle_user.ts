import { RegisterCircleUserRequest, RegisterCircleUserRequestValidationError } from '@/lib/types/api/RegisterCircleUserRequest'
import { AxiosError } from 'axios'
import { axiosInstance } from './index'
import { User, VerifyAuthError, VerifyValidationError } from './types'

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

        return 　{
            ...data.data,
            type: 'Success'
        }
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

export const deleteCircleUser = async (circleId: number, circleUserId: number, accessToken: string) => {
    
    try {
        await axiosInstance.delete<{
            success: true
        }>(
            `/admin/api/circle/${circleId}/user/${circleUserId}`, 
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

export const checkVerifyCircleUser = async (id: number, expires: string, signature: string) => {
    try {
        const { data } = await axiosInstance.get<{
            status: boolean
        }>(`/circle/api/email/verify/${id}`, {
            params: {
                expires,
                signature
            }
        })

        return {
            ...data,
            type: 'success'
        } as {
            status: boolean,
            type: 'success'
        }
    } catch (_e) {
        const e = _e as AxiosError<VerifyAuthError>

        if (e.response && e.response.status === 400) {
            return {
                ...e.response.data,
                type: 'verifyAuthError'
            } as VerifyAuthError
        }

        console.error(e)
    }
}


export const verificationEmailCircleUser = async (id: number, password: string, expires: string, signature: string) => {
    try {
        const { data } = await axiosInstance.post<{
            status: boolean
        }>(`/circle/api/email/verify/${id}`, {
            password
        }, {
            params: {
                expires,
                signature
            }
        })

        return {
            ...data,
            type: 'success'
        } as {
            status: boolean,
            type: 'success'
        }
    } catch (_e) {
        const e = _e as AxiosError<VerifyAuthError|VerifyValidationError>

        if (e.response && e.response.status === 400) {
            return {
                ...e.response.data,
                type: 'verifyAuthError'
            } as VerifyAuthError
        }

        if (e.response && e.response.status === 422) {
            return {
                ...e.response.data,
                type: 'verifyValidationError'
            } as VerifyValidationError
        }

        console.error(e)
    }
}
