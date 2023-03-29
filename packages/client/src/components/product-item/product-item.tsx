import Image from 'next/image'

import { IProduct } from 'src/types'

import { AddToCartButton } from './add-to-cart-button'
import { FavoriteButton } from './favorite-button'
import { ProductRating } from './product-rating'

interface Props {
  product: IProduct
}

export const ProductItem = ({ product }: Props) => {
  return (
    <div>
      <div>
        <FavoriteButton productId={product.id} />
        <AddToCartButton product={product} />
        <Image
          src={product.images[0]}
          width="300"
          height="300"
          alt={product.name}
        />
      </div>
      <h3>{product.name}</h3>
      <div>{product.category}</div>

      <ProductRating product={product} />

      <div>{product.price}</div>
    </div>
  )
}
