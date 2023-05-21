import React from 'react'
import { IPaginationProduct } from '@amazon/common/src'
import Link from 'next/link'
import styled, { useTheme } from 'styled-components'

import { Button } from 'src/components'

import { ProductCard } from './product-card'

interface Props {
  products: IPaginationProduct
  setCurrentPage: (val: number) => void
  currentPage: number
}

export const ProductsCatalog = ({
  products,
  setCurrentPage,
  currentPage,
}: Props) => {
  const { black } = useTheme()

  const allPages =
    products &&
    Array.from({ length: Math.ceil(products.length / 8) }, (_, i) => i + 1)

  return (
    <>
      <Wrap>
        <Link href={'/products/add'}>
          <AddProducts>
            <AddWrapper>
              <AddText>Add</AddText>
            </AddWrapper>
          </AddProducts>
        </Link>
        {products?.products.length ? (
          products.products.map((product) => (
            <React.Fragment key={product.id}>
              <ProductCard product={product} />
            </React.Fragment>
          ))
        ) : (
          <p>There are no products</p>
        )}
      </Wrap>
      <Pagination>
        {allPages.map((el) => (
          <Button
            onClick={() => setCurrentPage(el)}
            style={{
              borderRadius: '5px',
              border: `1px ${black} solid`,
            }}
            color={el !== currentPage ? 'inactive' : 'primary'}
            key={el}>
            {el}
          </Button>
        ))}
      </Pagination>
    </>
  )
}

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
`

const Pagination = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const AddProducts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.grey[0]};
  cursor: pointer;
`

const AddWrapper = styled.div`
  max-width: 100px;
  text-align: center;
`

const AddText = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.blue[0]};
  line-height: 24px;
`
