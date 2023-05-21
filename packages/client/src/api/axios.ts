import { axiosBase } from '@amazon/common/src'
import Cookies from 'js-cookie'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

import { fetchCheckAuth, store } from 'src/store'

export const api = axiosBase

api.defaults.baseURL = publicRuntimeConfig.backendUrl

api.interceptors.request.use(
  async (config) => {
    config.headers = config.headers ?? {}

    config.headers.Authorization = `Bearer ${Cookies.get('accessToken')}`

    return config
  },
  // eslint-disable-next-line promise/prefer-await-to-callbacks, promise/no-promise-in-callback
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (res) => {
    return res
  },
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  async (err) => {
    const originalRequest = err?.config

    if (err?.response?.status == 401 && err.config && !err?.config?._isRetry) {
      originalRequest._isRetry = true

      try {
        await store.dispatch(fetchCheckAuth())
        const accessToken = store.getState().user.user.accessToken
        Cookies.set('accessToken', accessToken)

        return api.request(originalRequest)
      } catch (error) {}
    }

    return Promise.reject(err)
  },
)
