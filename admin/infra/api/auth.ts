import { AxiosError } from 'axios'
import { axiosInstance } from './index'
import { Login, User, LoginValidationError, VerifyAuthError, VerifyValidationError } from './types'

export const login = async ({
    usernameOrEmail,
    password
}: Login): Promise<User|LoginValidationError> => {
    try {
        const { data } = await axiosInstance.post<User>('/admin/api/login', {
            usernameOrEmail,
            password
        })

        return {
            ...data,
            type: 'user'
        }
    } catch (_e) {
        const e = _e as AxiosError<LoginValidationError>

        if (e.response && e.response.status === 422 && e.response.data) {
            return {
                ...e.response.data,
                type: 'loginValidationError'
            }
        }

        throw new Error(e)
    }
}

export const checkVerify = async (id: number, expires: string, signature: string) => {
    try {
        const { data } = await axiosInstance.get<{
            status: boolean
        }>(`/api/email/verify/${id}`, {
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

export const verifyPassword = async (id: number, password: string, expires: string, signature: string) => {
    try {
        const { data } = await axiosInstance.post<{
            status: boolean
        }>(`/api/email/verify/${id}`, {
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