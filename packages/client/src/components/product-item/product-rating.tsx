import { useQuery } from '@tanstack/react-query'

import { ReviewsService } from 'src/api'
import { IProduct } from 'src/types'
import { Rating } from 'react-simple-star-rating'

interface Props {
  product: IProduct
}

export const ProductRating = ({ product }: Props) => {
  const { data: rating } = useQuery(
    ['get product rating', product.id],
    () => ReviewsService.getAverageById(product.id),
    {
      select: ({ data }) => data,
    })

  return (
    <div>

      <Rating
        readonly
        initialValue={rating}
        SVGstyle={{
          display: 'inline-block'
        }}
        size={34}
        allowFraction
        transition
      />
      <span>{product.reviews.length} reviews</span>
    </div>
  )
}
