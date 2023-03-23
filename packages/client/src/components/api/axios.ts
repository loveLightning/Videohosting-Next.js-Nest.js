import axios from 'axios'

// import { getContentType } from './api.helper'
import { AuthService, getAccessToken, removeFromStorage } from './auth'

export const axiosBase = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
})

axiosBase.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken()

    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  // eslint-disable-next-line promise/prefer-await-to-callbacks, promise/no-promise-in-callback
  (error) => Promise.reject(error),
)
axiosBase.interceptors.response.use(
  (config) => config,
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  async (error) => {
    const originalConfig = error.config

    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true

        await AuthService.getNewTokens()

        return axiosBase.request(originalConfig)
      }

      if (error.response.status !== 401) {
        removeFromStorage()

        return Promise.reject(error.response.data)
      }
    }

    return Promise.reject(error)
  },
)
