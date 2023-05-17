import { ChangeEvent, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import styled, { useTheme } from 'styled-components'

import { CartService, ProductsService, UsersService } from 'src/api'
import { Button, Loader, Select } from 'src/components'
import { useAppSelector, userSelector } from 'src/store'
import { EnumProductSort, IPaginationProduct } from 'src/types'

import { ProductItem } from '../product-item'

interface Props {
  products: IPaginationProduct
  title?: string
}

export const Catalog = ({ products, title }: Props) => {
  const [modeSort, setModeSort] = useState<EnumProductSort>(
    EnumProductSort.NEWEST,
  )

  const { black } = useTheme()

  const { query } = useRouter()
  const {
    user: { user },
  } = useAppSelector(userSelector)

  const categorySlug = query.slug as string
  const searchTerm = query.termSearch as string

  const [currentPage, setCurrentPage] = useState(1)

  const { data: sortingProducts, isLoading } = useQuery(
    ['products', modeSort, currentPage, categorySlug, searchTerm],
    () =>
      ProductsService.getAll({
        page: currentPage,
        perPage: 8,
        sort: modeSort,
        slug: query.slug as string,
        searchTerm,
      }),
    {
      initialData: products,
      keepPreviousData: true,
    },
  )

  const allPages = Array.from(
    { length: Math.ceil(sortingProducts.length / 8) },
    (_, i) => i + 1,
  )

  const { data: cart } = useQuery(
    ['get cart from catalog'],
    () => CartService.getCart(),
    {
      select: ({ data }) => data,
      enabled: !!user?.isActivated,
    },
  )

  const { data: profile } = useQuery(
    ['get profile from catalog'],
    () => UsersService.getProfile(),
    {
      select: ({ data }) => data,
      enabled: !!user?.isActivated,
    },
  )

  const changeDropdown = (e: ChangeEvent<HTMLSelectElement>) => {
    setModeSort(e.target.value as EnumProductSort)
  }

  if (isLoading) return <Loader />

  return (
    <>
      <Title>{title}</Title>
      <WrapSelect>
        <Select
          label="Sorting by"
          onChange={changeDropdown}
          options={(
            Object.keys(EnumProductSort) as Array<keyof typeof EnumProductSort>
          ).map((el) => ({
            value: EnumProductSort[el],
            label: EnumProductSort[el],
          }))}
          value={modeSort}
        />
      </WrapSelect>
      <Wrap>
        {sortingProducts?.products.length ? (
          sortingProducts.products.map((product) => (
            <ProductItem
              key={product.id}
              cart={cart}
              product={product}
              favorites={profile?.favorites}
            />
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

const Title = styled.p`
  font-family: ${({ theme }) => theme.roboto500};
  font-size: 30px;
  margin-bottom: 40px;
`

const WrapSelect = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Pagination = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`
