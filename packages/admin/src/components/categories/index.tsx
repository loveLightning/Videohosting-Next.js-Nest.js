import React from 'react'
import { CategoriesService } from '@amazon/common/src'
import { useQuery } from '@tanstack/react-query'

import { Loader } from 'src/components'

import { CategoriesCatalog } from './ui/categories-catalog'

export const Categories = () => {
  const { data: categories, isLoading } = useQuery(
    ['get all categories'],
    () => CategoriesService.getAll(),
    {
      select: ({ data }) => data,
    },
  )

  if (isLoading) {
    return <Loader />
  }

  return <CategoriesCatalog categories={categories} />
}
