import axios from 'axios'

import { AuthService } from './auth'
import { StorageService } from './storage'

export const axiosBase = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
})

axiosBase.interceptors.request.use(
  async (config) => {
    const accessToken = StorageService.getAccessToken()

    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  // eslint-disable-next-line promise/prefer-await-to-callbacks, promise/no-promise-in-callback
  (error) => Promise.reject(error),
)
// axiosBase.interceptors.response.use(
//   (config) => config,
//   // eslint-disable-next-line promise/prefer-await-to-callbacks
//   async (error) => {
//     const originalConfig = error.config

//     if (error.response) {
//       if (error.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true

//         await AuthService.getNewTokens()

//         return axiosBase.request(originalConfig)
//       }

//       if (error.response.status !== 401) {
//         StorageService.removeFromStorage()

//         return Promise.reject(error.response.data)
//       }
//     }

//     return Promise.reject(error)
//   },
// )

axiosBase.interceptors.response.use(
  (res) => {
    return res
  },
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  async (err) => {
    const originalConfig = err.config

    if (originalConfig.url !== '/auth/login' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true

        try {
          const res = await AuthService.getNewTokens()

          const { accessToken, refreshToken } = res

          StorageService.saveTokensInStorage(accessToken, refreshToken)

          return axiosBase(originalConfig)
        } catch (_error) {
          StorageService.removeFromStorage()
          window.location.href = window.location.origin

          return Promise.reject(_error)
        }
      }
    }

    return Promise.reject(err)
  },
)
