import axios from 'axios'

export const baseURL = process.env.API_URL
  ? `${process.env.API_URL}`
  : 'http://localhost:8000'
export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  console.log(`[Axios Request] ${config.baseURL}${config.url}`, config)
  return config
})
axiosInstance.interceptors.response.use((response) => {
  console.log(
    `[Axios Response] ${response.config.baseURL}${response.config.url}`,
    response
  )
  return response
})
