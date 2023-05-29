import React from 'react'

import { Categories, MainLayout, NextHead } from 'src/components'

const EditingCategoriesPage = () => {
  return (
    <>
      <NextHead title="Categories" />
      <MainLayout>
        <Categories />
      </MainLayout>
    </>
  )
}

export default EditingCategoriesPage
