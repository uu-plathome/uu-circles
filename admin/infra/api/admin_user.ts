import { RegisterAdminFormRequest, RegisterAdminFormRequestValidationError } from "@/lib/types/api/RegisterAdminFormRequest"
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
