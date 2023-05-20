import { ConfirmType, IOrder, StatusData } from 'src/types'

import { ApiMethods } from '../enums'
import { BaseService } from './base'

export class OrdersService extends BaseService {
  public static async getAll() {
    return await this.fetch<IOrder[]>({
      method: 'GET',
      url: ApiMethods.Orders,
    })
  }
  public static async placeOrder(data: StatusData) {
    return await this.fetch<ConfirmType>({
      method: 'POST',
      url: ApiMethods.Orders,
      data,
    })
  }
}
