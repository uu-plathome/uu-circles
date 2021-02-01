import { RegisterAdminFormRequest, RegisterAdminFormRequestValidationError } from "@/lib/types/api/RegisterAdminFormRequest"
import { UpdateAdminUserRequest, UpdateAdminUserRequestValidationError } from "@/lib/types/api/UpdateAdminUserRequest"
import { User } from "@/lib/types/model/User"
import { AxiosError } from "axios"
import { axiosInstance } from "."

export const getAdminUserList = async (accessToken: string) => {
    const { data } = await axiosInstance.get<{
        data: User[]
    }>('/admin/api/admin-user', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    return data.data
}

export const createAdminUser = async (user: RegisterAdminFormRequest, accessToken: string) => {

    try {
        const { data } = await axiosInstance.post(
            '/admin/api/admin-user', 
            user, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        )
    
        return data.data
    } catch (_e) {
        const e = _e as AxiosError<RegisterAdminFormRequestValidationError>

        if (e.response && e.response.status === 422 && e.response.data) {
            return  {
                ...e.response.data,
                type: 'RegisterAdminFormRequestValidationError'
            } as RegisterAdminFormRequestValidationError
        }

        console.error(e)
    }
}

export const deleteAdminUser = async (userId: number, accessToken: string) => {

    try {
        const { data } = await axiosInstance.delete(
            `/admin/api/admin-user/${userId}`, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        )
    
        return data.data
    } catch (_e) {
        const e = _e as AxiosError<{
            errors: {
                data?: string
            }
            message: string,
            type: 'DeleteAdminUserValidationError'
        }>

        if (e.response && e.response.status === 422 && e.response.data) {
            return  {
                ...e.response.data,
                type: 'DeleteAdminUserValidationError'
            }
        }

        console.error(e)
    }
}

export const updateAdminUser = async (userId: number, user: UpdateAdminUserRequest, accessToken: string) => {
    
    try {
        const { data } = await axiosInstance.put<{
            data: User[]
        }>(
            `/admin/api/admin-user/${userId}`, 
            user,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        )

        return {
            ...data.data,
            type: 'Success'
        }
    } catch (_e) {
        const e = _e as AxiosError<UpdateAdminUserRequestValidationError>

        if (e.response && e.response.status === 422 && e.response.data) {
            return  {
                ...e.response.data,
                type: 'UpdateAdminUserRequestValidationError'
            } as UpdateAdminUserRequestValidationError
        }

        console.error(e)
    }
}

export const getAdminUser = async (userId: number, accessToken: string) => {
    const { data } = await axiosInstance.get<{
        data: User
    }>(
        `/admin/api/admin-user/${userId}`, 
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
    )

    return data.data
}
