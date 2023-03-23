export interface IReview {
  rating: number
  text: string
  userId: number
  productId: number
  id: number
}

export interface IRating {
  rating: number
}

export interface IReviewDto {
  rating: number
  text: string
}
