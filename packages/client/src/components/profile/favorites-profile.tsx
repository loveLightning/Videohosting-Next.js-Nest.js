import styled from 'styled-components'

import { IProduct } from 'src/types'

import { ProductItem } from '../product-item'

interface Props {
  favorites: IProduct[]
}

export const FavoritesProfile = ({ favorites }: Props) => {
  return (
    <Wrap>
      {favorites.length ? (
        favorites.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            favorites={favorites}
          />
        ))
      ) : (
        <p>There are no products</p>
      )}
    </Wrap>
  )
}

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
`
