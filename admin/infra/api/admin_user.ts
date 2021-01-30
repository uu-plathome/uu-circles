import { axiosInstance } from "."
import { RegisterUser, User } from "./types"

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

export const createAdminUser = async (user: RegisterUser, accessToken: string) => {
    const { data } = await axiosInstance.post('/admin/api/admin-user', {
        displayName: user.displayName,
        username: user.username,
        email: user.email
    } as RegisterUser, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    return data.data
}
