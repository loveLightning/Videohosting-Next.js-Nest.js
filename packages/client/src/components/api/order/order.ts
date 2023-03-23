import { ApiMethods } from 'src/types'
import { BaseService } from '../base'
import { IOrder } from './res-types'

export class OrdersService extends BaseService {
  public static async getAll() {
    return await this.fetch<IOrder[]>({
      method: 'GET',
      url: ApiMethods.Orders,
    })
  }
}
