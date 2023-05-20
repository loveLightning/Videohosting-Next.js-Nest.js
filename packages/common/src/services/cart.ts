import { RootCart } from 'src/types'

import { ApiMethods } from '../enums'
import { BaseService } from './base'

export class CartService extends BaseService {
  public static async getCart() {
    return await this.fetch<RootCart>({
      method: 'GET',
      url: ApiMethods.Cart,
    })
  }

  public static async addProduct(productId: number) {
    return await this.fetch<void>({
      method: 'POST',
      url: `${ApiMethods.Cart}/${productId}`,
    })
  }

  public static async deleteCart(cartId: number) {
    return await this.fetch<void>({
      method: 'DELETE',
      url: `${ApiMethods.Cart}/${cartId}`,
    })
  }

  public static async removeProduct(cartId: number, productId: number) {
    return await this.fetch<void>({
      method: 'DELETE',
      url: `${ApiMethods.Cart}/${cartId}/${productId}`,
    })
  }

  public static async updateQuantity(
    cartId: number,
    productId: number,
    quantity: number,
  ) {
    return await this.fetch<void>({
      method: 'PATCH',
      url: `${ApiMethods.Cart}/${cartId}/${productId}`,
      data: {
        quantity,
      },
    })
  }
}
