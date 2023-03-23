import { ApiMethods } from 'src/types'

import { BaseService } from '../base'
import { IPagination } from './req-types'

export class PaginationService extends BaseService {
  public static async getProfile(data: IPagination, defaultPerPage: number) {
    return await this.fetch({
      method: 'GET',
      url: `${ApiMethods.Pagination}`,
      data: {
        data,
        defaultPerPage,
      },
    })
  }
}
