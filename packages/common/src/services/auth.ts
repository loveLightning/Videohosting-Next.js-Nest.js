import { ApiMethods } from '../enums'
import { AuthLogin, AuthRegister, IUser } from '../types'
import { BaseService } from './base'

export class AuthService extends BaseService {
  public static async checkAuth() {
    return await this.fetch<IUser>({
      url: ApiMethods.Refresh,
      method: 'GET',
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
