import React, { useState } from 'react'
import { ProductsService } from '@amazon/common/src'
import { useQuery } from '@tanstack/react-query'

import { Loader } from 'src/components'

import { ProductsCatalog } from './ui/products-catalog'

export const Products = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data: sortingProducts, isLoading } = useQuery(
    ['get all products', currentPage],
    () =>
      ProductsService.getAll({
        page: currentPage,
        perPage: 8,
      }),
    {
      keepPreviousData: true,
    },
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <ProductsCatalog
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        products={sortingProducts}
      />
    </>
  )
}
