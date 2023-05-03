import axios from 'axios'
import Cookies from 'js-cookie'

import { AuthService } from './auth'

export const axiosBase = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
})

axiosBase.interceptors.request.use(
  async (config) => {
    config.headers['Authorization'] = `Bearer ${Cookies.get('accessToken')}`

    return config
  },
  // eslint-disable-next-line promise/prefer-await-to-callbacks, promise/no-promise-in-callback
  (error) => Promise.reject(error),
)

axiosBase.interceptors.response.use(
  (res) => {
    return res
  },
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  async (err) => {
    const originalRequest = err?.config

    if (err?.response?.status == 401 && err.config && !err?.config?._isRetry) {
      originalRequest._isRetry = true

      try {
        const response = await AuthService.checkAuth()
        const { accessToken } = response.data
        Cookies.set('accessToken', accessToken)

        return axiosBase.request(originalRequest)
      } catch (error) {}
    }

    return Promise.reject(err)
  },
)
