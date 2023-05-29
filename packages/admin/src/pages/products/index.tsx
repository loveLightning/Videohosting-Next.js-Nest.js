import { MainLayout, NextHead, Products } from 'src/components'

const ProductsPage = () => {
  return (
    <>
      <NextHead title="Products" />
      <MainLayout>
        <Products />
      </MainLayout>
    </>
  )
}

export default ProductsPage
