import React from 'react'

import { AddProducts, MainLayout, NextHead } from 'src/components'

const AddingProductsPage = () => {
  return (
    <>
      <NextHead title="Add product" />
      <MainLayout>
        <AddProducts />
      </MainLayout>
    </>
  )
}

export default AddingProductsPage
