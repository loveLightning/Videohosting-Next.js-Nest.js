import { EditProducts, MainLayout, NextHead } from 'src/components'

const ProductsEditPage = () => {
  return (
    <>
      <NextHead title="Edit product" />
      <MainLayout>
        <EditProducts />
      </MainLayout>
    </>
  )
}

export default ProductsEditPage
