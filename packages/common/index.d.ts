import { AxiosRequestConfig as AxiosConfig } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig extends AxiosConfig {
    retry?: number
    retryDelay?: number
  }
}
