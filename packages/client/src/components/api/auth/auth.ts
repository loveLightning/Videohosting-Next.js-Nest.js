import Cookies from 'js-cookie'

import { ApiMethods } from 'src/types'
import { IUser } from 'src/types'

import { getContentType } from '../api.helper'
import { BaseService } from '../base'
import { saveTokensInStorage, saveUserInStorage } from './auth.helper'
import { AuthLogin, AuthRegister } from './req-types'

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
      saveTokensInStorage(accessToken, refreshToken)
    }

    return response
  }

  public static async register(data: AuthRegister) {
    const response = await this.fetch<IUser>({
      url: ApiMethods.Register,
      method: 'POST',
      data,
    })

    if (response.data.accessToken) saveUserInStorage(response.data)

    return response.data
  }

  public static async login(data: AuthLogin) {
    const response = await this.fetch<IUser>({
      url: ApiMethods.Login,
      method: 'POST',
      data,
    })

    if (response.data.accessToken) saveUserInStorage(response.data)

    return response.data
  }
}
