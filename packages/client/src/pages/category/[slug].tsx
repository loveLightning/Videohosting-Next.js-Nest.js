import { CategoriesService, ProductsService } from '@amazon/common/src'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { Catalog, MainLayout, NextHead } from 'src/components'
import { ICategory, IPaginationProduct } from 'src/types'

interface Props {
  products: IPaginationProduct
  category: ICategory
}

const CategoryPage = ({ category, products }: Props) => {
  return (
    <>
      <NextHead
        description={`category ${category.name}`}
        title={`Amazon. ${category.name}`}
      />
      <MainLayout>
        <Catalog products={products} title={category.name} />
      </MainLayout>
    </>
  )
}

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await CategoriesService.getAll()

  const paths = data.map((category) => ({
    params: { slug: category.slug },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params

  const products = await ProductsService.getAll({
    page: 1,
    perPage: 8,
    slug,
  })

  const { data: category } = await CategoriesService.getBySlug(slug)

  return {
    props: {
      products,
      category,
    },
    revalidate: 10,
  }
}

export default CategoryPage
