import { RegisterCircleUserRequest, RegisterCircleUserRequestValidationError } from '@/lib/types/api/RegisterCircleUserRequest'
import { VerificationEmailCircleUserRequestValidationError } from '@/lib/types/api/VerificationEmailCircleUserRequest'
import { VerificationInvalidError } from '@/lib/types/api/VerificationInvalidError'
import { VerificationResendCircleUserFormRequestValidationError } from '@/lib/types/api/VerificationResendCircleUserFormRequest'
import { User } from '@/lib/types/model/User'
import { AxiosError } from 'axios'
import { axiosInstance } from './index'

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
        const e = _e as AxiosError<VerificationInvalidError>

        if (e.response && e.response.status === 400) {
            return {
                ...e.response.data,
                type: 'VerificationInvalidError'
            } as VerificationInvalidError
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
        const e = _e as AxiosError<VerificationInvalidError|VerificationEmailCircleUserRequestValidationError>

        if (e.response && e.response.status === 400) {
            return {
                ...e.response.data,
                type: 'VerificationInvalidError'
            } as VerificationInvalidError
        }

        if (e.response && e.response.status === 422) {
            return {
                ...e.response.data,
                type: 'VerificationEmailCircleUserRequestValidationError'
            } as VerificationEmailCircleUserRequestValidationError
        }

        console.error(e)
    }
}


export const resendEmailCircleUser = async (email: string) => {
    try {
        const { data } = await axiosInstance.post<{
            status: boolean
        }>(`/admin/api/email/resend`, {
            email
        })

        return {
            ...data,
            type: 'success'
        } as {
            status: boolean,
            type: 'success'
        }
    } catch (_e) {
        const e = _e as AxiosError<VerificationResendCircleUserFormRequestValidationError>

        if (e.response && e.response.status === 422) {
            return {
                ...e.response.data,
                type: 'VerificationResendCircleUserFormRequestValidationError'
            } as VerificationResendCircleUserFormRequestValidationError
        }

        console.error(e)
    }
}