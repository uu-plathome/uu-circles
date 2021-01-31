import { LoginAdminFormRequest, LoginAdminFormRequestValidationError } from '@/lib/types/api/LoginAdminFormRequest'
import { VerificationConfirmRequestValidationError } from '@/lib/types/api/VerificationConfirmRequest'
import { VerificationInvalidError } from '@/lib/types/api/VerificationInvalidError'
import { VerificationResendAdminUserFormRequestValidationError } from '@/lib/types/api/VerificationResendAdminUserFormRequest'
import { User } from '@/lib/types/model/User'
import { AxiosError } from 'axios'
import { axiosInstance } from './index'

export const login = async (
    request: LoginAdminFormRequest
) => {
    try {
        const { data } = await axiosInstance.post<User>(
            '/admin/api/login', 
            request
        )

        return {
            ...data,
            type: 'User'
        } as User
    } catch (_e) {
        const e = _e as AxiosError<LoginAdminFormRequestValidationError & {
            errors: {
                data?: string
            }
            message: string
        }>

        if (e.response && e.response.status === 422 && e.response.data) {
            if (e.response.data.errors && e.response.data.errors.data) {
                return {
                    ...e.response.data,
                    type: 'LoginAdminMainFormRequestValidationError'
                }
            }

            return {
                ...e.response.data,
                type: 'LoginAdminFormRequestValidationError'
            }
        }


        console.error(e)
    }
}

export const checkVerify = async (id: number, expires: string, signature: string) => {
    try {
        const { data } = await axiosInstance.get<{
            status: boolean
        }>(`/admin/api/email/verify/${id}`, {
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

export const verifyPassword = async (id: number, password: string, expires: string, signature: string) => {
    try {
        const { data } = await axiosInstance.post<{
            status: boolean
        }>(`/admin/api/email/verify/${id}`, {
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
        const e = _e as AxiosError<VerificationInvalidError|VerificationConfirmRequestValidationError>

        if (e.response && e.response.status === 400) {
            return {
                ...e.response.data,
                type: 'VerificationInvalidError'
            } as VerificationInvalidError
        }

        if (e.response && e.response.status === 422) {
            return {
                ...e.response.data,
                type: 'VerificationConfirmRequestValidationError'
            } as VerificationConfirmRequestValidationError
        }

        console.error(e)
    }
}

export const resendEmail = async (email: string) => {
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
        const e = _e as AxiosError<VerificationResendAdminUserFormRequestValidationError>

        if (e.response && e.response.status === 422) {
            return {
                ...e.response.data,
                type: 'VerificationResendAdminUserFormRequestValidationError'
            } as VerificationResendAdminUserFormRequestValidationError
        }

        console.error(e)
    }
}
