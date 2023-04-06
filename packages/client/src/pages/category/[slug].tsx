import { GetStaticPaths, GetStaticProps } from 'next'

import { CategoriesService, ICategory, ProductsService } from 'src/api'
import { Catalog, MainLayout } from 'src/components'
import { withAuth } from 'src/hoc'
import { IProduct } from 'src/types'

interface Props {
  products: IProduct[]
  category: ICategory
}

const CategoryPage = ({ products, category }: Props) => {
  console.log(products, category)

  return (
    <MainLayout>
      <Catalog products={products} title={category.name} />
    </MainLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await CategoriesService.getAll()

  const paths = categories.data.map((category) => {
    return {
      params: {
        slug: category.slug,
      },
    }
  })

  return {
    fallback: false,
    paths,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: products } = await ProductsService.getByCategory(
    params?.slug as string,
  )

  const { data: category } = await CategoriesService.getBySlug(
    params?.slug as string,
  )

  return {
    props: {
      products,
      category,
    },
  }
}

export default withAuth(CategoryPage)
