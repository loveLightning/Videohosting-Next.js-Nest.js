import { ApiMethods, IFullProfile } from 'src/types'

import { BaseService } from '../base'
import { IUpdateUser } from './req-user'

export class UsersService extends BaseService {
  public static async getProfile() {
    return await this.fetch<IFullProfile>({
      method: 'GET',
      url: `${ApiMethods.Users}/profile`,
    })
  }

  public static async updateProfile(data: IUpdateUser) {
    return await this.fetch({
      method: 'GET',
      url: `${ApiMethods.Users}/profile`,
      data,
    })
  }

  public static async toggleFavorites(id: number | string) {
    return await this.fetch({
      method: 'GET',
      url: `${ApiMethods.Users}/profile/favorites${id}`,
    })
  }
}
