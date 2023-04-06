import { Catalog, MainLayout } from 'src/components'
import { IPaginationProduct } from 'src/types'

export const Home = ({ length, products }: IPaginationProduct) => {
  return (
    <MainLayout>
      {products?.length && (
        <Catalog products={products} title="Freshed products" />
      )}
    </MainLayout>
  )
}
