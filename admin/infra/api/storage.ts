import { AdminPutStorageRequest, AdminPutStorageRequestValidationError } from "@/lib/types/api/AdminPutStorageRequest"
import { AxiosError } from "axios"
import { axiosInstance } from "."

export const putStorage = async (file: Blob|File, accessToken: string) => {
    try {
        const { data } = await axiosInstance.post<{
            url: string
        }>(
            '/admin/storage', 
            {
                file
            } as AdminPutStorageRequest,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        )

        return {
            ...data,
            type: 'Success'
        }
    } catch (_e) {
        const e = _e as AxiosError<AdminPutStorageRequestValidationError>

        if (e.response && e.response.status === 422 && e.response.data) {
            return {
                ...e.response.data,
                type: 'AdminPutStorageRequestValidationError'
            }
        }

        console.error(e)
    }
}