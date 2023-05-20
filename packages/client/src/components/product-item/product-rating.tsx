import { Rating } from 'react-simple-star-rating'
import { ReviewsService } from '@amazon/common/src'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'

import { IProduct } from 'src/types'

interface Props {
  product: IProduct
}

export const ProductRating = ({ product }: Props) => {
  const { data: rating } = useQuery(
    ['get product rating', product.id],
    () => ReviewsService.getAverageById(product.id),
    {
      select: ({ data }) => data,
    },
  )

  return (
    <Wrapper>
      <Rating
        readonly
        initialValue={rating?.rating}
        size={23}
        transition
        allowFraction={true}
      />

      <span>{product?.reviews?.length} reviews</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
