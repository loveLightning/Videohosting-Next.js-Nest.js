import Cookies from 'js-cookie'

import { ApiMethods } from 'src/types'
import { IUser } from 'src/types'
import { AuthLogin, AuthRegister } from 'src/types'

import { getContentType } from '../api.helper'
import { BaseService } from '../base'
import { StorageService } from '../storage'

export class AuthService extends BaseService {
  public static async getNewTokens() {
    const refreshToken = Cookies.get('refreshToken')

    const response = await this.fetch<IUser>({
      url: ApiMethods.AccessToken,
      method: 'GET',
      headers: getContentType(),
      data: {
        refreshToken,
      },
    })

    if (response.data.accessToken) {
      const { accessToken, refreshToken } = response.data
      StorageService.saveTokensInStorage(accessToken, refreshToken)
    }

    return response.data
  }

  public static async register(data: AuthRegister) {
    const response = await this.fetch<IUser>({
      url: ApiMethods.Register,
      method: 'POST',
      data,
    })

    if (response.data.accessToken) StorageService.saveToStorage(response.data)

    return response.data
  }

  public static async login(data: AuthLogin) {
    const response = await this.fetch<IUser>({
      url: ApiMethods.Login,
      method: 'POST',
      data,
    })

    if (response.data.accessToken) StorageService.saveToStorage(response.data)

    return response.data
  }

  public static async verifyToken(accessToken: string) {
    const response = await this.fetch<{ verify: boolean }>({
      url: ApiMethods.VerifyToken,
      method: 'POST',
      data: {
        accessToken,
      },
    })

    return response.data
  }
}
