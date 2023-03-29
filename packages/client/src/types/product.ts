export interface IProduct {
  id: number
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  category: {
    name: string
  }
  reviews: {
    length: number
  }
}

export interface IPaginationProduct {
  products: IProduct[]
  length: number
}
