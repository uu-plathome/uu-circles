import axios from 'axios'

export const baseURL = process.env.API_URL ? `${process.env.API_URL}` : 'http://localhost:8000'
export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true
})