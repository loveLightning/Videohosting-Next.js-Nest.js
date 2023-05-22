import { ApiMethods } from '../enums'
import { IFullProfile, IUpdateUser } from '../types'
import { BaseService } from './base'

export class UsersService extends BaseService {
  public static async getProfile() {
    return await this.fetch<IFullProfile>({
      method: 'GET',
      url: `${ApiMethods.Users}/profile`,
    })
  }

  public static async updateProfile(data: IUpdateUser) {
    return await this.fetch({
      method: 'PATCH',
      url: `${ApiMethods.Users}/profile`,
      data,
    })
  }

  public static async updateAvatar(data: FormData) {
    return await this.fetch({
      method: 'PATCH',
      url: `${ApiMethods.Users}/profile/avatar`,
      data,
    })
  }

  public static async toggleFavorites(id: number | string) {
    return await this.fetch({
      method: 'PATCH',
      url: `${ApiMethods.Users}/profile/favorites/${id}`,
    })
  }
}
