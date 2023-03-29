import { ApiMethods } from 'src/types'
import { IOrder } from 'src/types'

import { BaseService } from '../base'

export class OrdersService extends BaseService {
  public static async getAll() {
    return await this.fetch<IOrder[]>({
      method: 'GET',
      url: ApiMethods.Orders,
    })
  }
}
