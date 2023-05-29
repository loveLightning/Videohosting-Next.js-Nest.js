import React from 'react'

import { AddCategories, MainLayout, NextHead } from 'src/components'

const AddingCategoriesPage = () => {
  return (
    <>
      <NextHead title="Add category" />
      <MainLayout>
        <AddCategories />
      </MainLayout>
    </>
  )
}

export default AddingCategoriesPage
