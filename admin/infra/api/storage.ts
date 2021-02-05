import { AdminPutStorageRequest, AdminPutStorageRequestValidationError } from "@/lib/types/api/AdminPutStorageRequest"
import { AxiosError } from "axios"
import { axiosInstance } from "."

export const putStorage = async (file: Blob|string, accessToken: string) => {
    try {
        const formData = new FormData()
        formData.append('file', file)
        const { data } = await axiosInstance.post<{
            url: string
        }>(
            '/admin/api/storage', 
            formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        )

        return {
            url: data.url,
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