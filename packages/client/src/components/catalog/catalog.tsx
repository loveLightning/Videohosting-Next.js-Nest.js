import { IProduct } from 'src/types'

import { ProductItem } from '../product-item'

interface Props {
  products: IProduct[]
}

export const Catalog = ({ products }: Props) => {
  return (
    <section>
      {products.length ? (
        products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <p>There are no products</p>
      )}
    </section>
  )
}
