import { IProduct } from './product'

export interface ICartItem {
  product: IProduct
  quantity: number
}

export type IAddToCartPayload = Omit<ICartItem, 'quantity'>

export interface ICHangeQuantityPayload {
  id: number
  type: 'munus' | 'plus'
}

// export type TypeSize = 'SHORT' | 'TALL' | 'GRANDE' | 'VENTI'

// export interface ICHangeSizePayload extends Pick<ICartItem, 'id'> {
//   size: TypeSize
// }
