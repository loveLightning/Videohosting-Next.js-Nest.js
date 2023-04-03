import axios from 'axios'

import { ApiMethods } from 'src/types'
import { IUser } from 'src/types'
import { AuthLogin, AuthRegister } from 'src/types'

import { BaseService } from '../base'

export class AuthService extends BaseService {
  public static async checkAuth() {
    return await axios.get<IUser>(ApiMethods.Refresh, {
      baseURL: process.env.SERVER_URL,
      withCredentials: true,
    })
  }

  public static async register(data: AuthRegister) {
    return await this.fetch<IUser>({
      url: ApiMethods.Register,
      method: 'POST',
      data,
    })
  }

  public static async login(data: AuthLogin) {
    return await this.fetch<IUser>({
      url: ApiMethods.Login,
      method: 'POST',
      data,
    })
  }

  public static async logout() {
    return await this.fetch({
      url: ApiMethods.Logout,
      method: 'POST',
    })
  }
}
