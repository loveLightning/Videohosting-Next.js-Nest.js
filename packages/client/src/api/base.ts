import React from 'react'
import { AxiosRequestConfig } from 'axios'

import { axiosBase } from './axios'

export class BaseService extends React.Component {
  public static async fetch<T>(props: AxiosRequestConfig) {
    return await axiosBase.request<T>(props)
  }
}
