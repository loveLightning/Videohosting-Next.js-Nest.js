import Cookies from 'js-cookie'

import { IUser } from 'src/types'

import { BaseService } from '../base'

export class StorageService extends BaseService {
  public static getAccessToken = () => {
    return Cookies.get('accessToken') || null
  }

  public static getRefreshToken = () => {
    return Cookies.get('refreshToken') || null
  }

  public static getSaveUser = () => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('user') || '{}')
    }
  }

  public static saveTokensInStorage = (
    accessJwt: string,
    refreshJwt: string,
  ) => {
    Cookies.set('accessToken', accessJwt)
    Cookies.set('refreshToken', refreshJwt)
  }

  public static removeFromStorage = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')

    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
    }
  }

  public static saveToStorage = (data: IUser) => {
    const { accessToken, refreshToken } = data
    StorageService.saveTokensInStorage(accessToken, refreshToken)
    localStorage.setItem('user', JSON.stringify(data.user))
  }
}
