import axios from 'axios'

export const baseURL = process.env.API_URL 
export const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
})