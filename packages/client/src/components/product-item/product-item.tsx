import styled from 'styled-components'

import { IProduct } from 'src/types'

import { AddToCartButton } from './add-to-cart-button'
import { FavoriteButton } from './favorite-button'
import { ProductRating } from './product-rating'

interface Props {
  product: IProduct
}

export const ProductItem = ({ product }: Props) => {
  return (
    <Card>
      <FavoriteButton productId={product.id} />
      <AddToCartButton product={product} />
      {/* {product.images[0].length && (
        <Image
          src={product.images[0]}
          width="300"
          height="300"
          alt={product.name}
        />
      )} */}

      <h3>{product.name}</h3>
      <div>{product.category?.name}</div>

      <ProductRating product={product} />

      <div>{product.price}</div>
    </Card>
  )
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
`
