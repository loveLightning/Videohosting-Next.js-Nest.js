export interface RootCart {
  id: number
  userId: number
  cartItems: CartProduct[]
}

export interface CartProduct {
  id: number
  cartId: number
  productId: number
  quantity: number
  product: ProductCartItem
}

export interface ProductCartItem {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  categoryId: number
  userId: number | null
}

export interface UpdateCart {
  cartId: number
  productId: number
  quantity: number
}

export interface RemoveCart {
  cartId: number
  productId: number
}

// export type TypeSize = 'SHORT' | 'TALL' | 'GRANDE' | 'VENTI'

// export interface ICHangeSizePayload extends Pick<ICartItem, 'id'> {
//   size: TypeSize
// }
