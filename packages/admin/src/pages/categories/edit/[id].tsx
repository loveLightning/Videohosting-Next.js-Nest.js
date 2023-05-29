import { EditCategories, MainLayout, NextHead } from 'src/components'

const ProductsEditPage = () => {
  return (
    <>
      <NextHead title="Edit category" />
      <MainLayout>
        <EditCategories />
      </MainLayout>
    </>
  )
}

export default ProductsEditPage
