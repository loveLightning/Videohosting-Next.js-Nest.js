import { Catalog, MainLayout } from 'src/components'
import { IPaginationProduct } from 'src/types'

interface Props {
  products: IPaginationProduct
}

export const Home = ({ products }: Props) => {
  return (
    <MainLayout>
      <Catalog products={products} title="Freshed products" />
    </MainLayout>
  )
}
