import axios from 'axios'

import { AuthLogin, AuthRegister, IUser } from 'src/types'

import { ApiMethods } from '../enums'
import { BaseService } from './base'

export class AuthService extends BaseService {
  public static async checkAuth() {
    return await axios.get<IUser>(ApiMethods.Refresh, {
      baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
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
