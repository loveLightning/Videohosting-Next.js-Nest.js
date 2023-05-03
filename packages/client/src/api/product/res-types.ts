import { EnumProductSort } from 'src/types'

export interface IProductSort {
  searchTerm?: string
  sort?: EnumProductSort
  page?: number
  perPage?: number
  slug?: string
}

export interface IProduct {
  id: number
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  categoryId: number
  userId: number
}

export type UpdateProductTypes = Omit<IProduct, 'id' | 'userId' | 'slug'>
