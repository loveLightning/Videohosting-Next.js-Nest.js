import { ApiMethods } from 'src/types'
import { BaseService } from '../base'
import { AuthLogin, AuthRegister, UpdateName } from './req-types'

export class AuthService extends BaseService {
  public static async register(data: AuthRegister) {
    return await this.fetch({
      url: ApiMethods.Register,
      method: 'POST',
      data,
    })
  }

  public static async login(data: AuthLogin) {
    return await this.fetch({
      url: ApiMethods.Login,
      method: 'POST',
      data,
    })
  }

  public static async updateName(data: UpdateName) {
    return await this.fetch({
      url: ApiMethods.UpdateName,
      method: 'POST',
      data,
    })
  }
}
