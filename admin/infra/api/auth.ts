import { AxiosError } from 'axios'
import { axiosInstance } from './index'
import { Login, User, LoginValidationError } from './types'

export const login = async ({
    usernameOrEmail,
    password
}: Login): Promise<User|LoginValidationError> => {
    try {
        const { data } = await axiosInstance.post<User>('/login', {
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

        console.error(e)
    }
}
