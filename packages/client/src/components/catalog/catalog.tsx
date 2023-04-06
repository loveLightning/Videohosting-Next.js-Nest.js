import styled from 'styled-components'

import { IProduct } from 'src/types'

import { ProductItem } from '../product-item'

interface Props {
  products: IProduct[]
  title?: string
}

export const Catalog = ({ products, title }: Props) => {
  return (
    <>
      <Title>{title}</Title>
      <Wrap>
        {products.length ? (
          products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          <p>There are no products</p>
        )}
      </Wrap>
    </>
  )
}

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`

const Title = styled.p`
  font-family: ${({ theme }) => theme.roboto500};
  font-size: 30px;
  margin-bottom: 40px;
`
