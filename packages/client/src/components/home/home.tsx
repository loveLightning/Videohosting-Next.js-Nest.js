import { Catalog } from 'src/components'
import { IPaginationProduct } from 'src/types'

export const Home = ({ products, length }: IPaginationProduct) => {
  return <Catalog products={products} />
}
