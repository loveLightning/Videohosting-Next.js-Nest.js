import { IProduct } from './product'

enum EnumOrderItemStatus {
  PENDING = 'PENDING',
  PAYED = 'PAYED',
  SHIPED = 'SHIPED',
  DELIVERED = 'DELIVERED',
}

export interface IOrder {
  id: number
  createdAt: string
  updatedAt: string
  total: number
  status: string
  userId: number
  items: Item[]
}

export interface Item {
  id: number
  createdAt: string
  updatedAt: string
  quantity: number
  price: number
  orderId: number
  productId: number
  product: IProduct
}

export interface StatusData {
  status?: EnumOrderItemStatus
  items: {
    price: number
    quantity: number
    productId: number
  }[]
}

export interface ConfirmType {
  confirmation: {
    confirmation_url: string
  }
}
