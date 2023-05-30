import { ProductsService } from '@amazon/common/src'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { Catalog, MainLayout, NextHead } from 'src/components'
import { withAuthPublic } from 'src/hoc'

const SearchPage = () => {
  const { query } = useRouter()

  const searchTerm = query.termSearch as string

  const { data: products } = useQuery(['get products'], () =>
    ProductsService.getAll({
      searchTerm,
    }),
  )

  return (
    <>
      <NextHead
        title="Amazon"
        description="Search term by name and other params"
      />
      <MainLayout>
        {products && (
          <Catalog
            products={products}
            title={`search by request ${searchTerm || ''}`}
          />
        )}
      </MainLayout>
    </>
  )
}

export default withAuthPublic(SearchPage)
