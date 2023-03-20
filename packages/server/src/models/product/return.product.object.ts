import { Prisma } from '@prisma/client'
import { returnCategoryObj } from '../category/return-category.object'
import { returnReviewObj } from '../review/return-review.object'

export const returnProductObj: Prisma.ProductSelect = {
  id: true,
  description: true,
  images: true,
  name: true,
  price: true,
  slug: true,
  createdAt: true,
}

export const returnFullOfproductObj: Prisma.ProductSelect = {
  ...returnProductObj,
  reviews: {
    select: {
      ...returnReviewObj,
    },
  },
  category: {
    select: returnCategoryObj,
  },
}
