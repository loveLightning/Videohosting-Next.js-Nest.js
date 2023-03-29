import { IProduct } from './product'

export interface ICartItem {
  id: number
  product: IProduct
  quantity: number
  price: number
}

export type IAddToCartPayload = Omit<ICartItem, 'id'>

export interface ICHangeQuantityPayload extends Pick<ICartItem, 'id'> {
  type: 'munus' | 'plus'
}

// export type TypeSize = 'SHORT' | 'TALL' | 'GRANDE' | 'VENTI'

// export interface ICHangeSizePayload extends Pick<ICartItem, 'id'> {
//   size: TypeSize
// }
