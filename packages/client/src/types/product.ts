import { IProfile } from './user'

export interface IProduct {
  id: number
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  category: {
    id: number
    name: string
    slug: string
  }
  reviews?: ReviewsTypes[]
  length?: number
}

interface ReviewsTypes {
  id: number
  rating: number
  text: string
  user: IProfile
}

export interface IPaginationProduct {
  products: IProduct[]
  length: number
}

export enum EnumProductSort {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export interface IProductSort {
  searchTerm?: string
  sort?: EnumProductSort
  page?: number
  perPage?: number
  slug?: string
}

export type UpdateProductTypes = Omit<IProduct, 'id' | 'userId' | 'slug'>
