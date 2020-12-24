import axios from 'axios'

export const baseURL = process.env.API_URL ? `${process.env.API_URL}/admin/api` : 'http://localhost:8000/admin/api'
export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true
})