// import {
//   AddProduct,
//   CategoriesService,
//   ProductsService,
// } from '@amazon/common/src'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import axios from 'axios'
// import { Form, Formik, FormikHelpers } from 'formik'
// import { useRouter } from 'next/router'

// import { Button, FormikField } from 'src/components'
// import { addCategorySchema } from 'src/scheme'

import { Wrapper } from './styled'

// interface Props {
//   formData: AddProduct
//   id: string
// }

export const EditProducts = () => {
  // const {
  //   query: { id },
  //   back,
  // } = useRouter()

  // const queryClient = useQueryClient()

  // const { data } = useQuery(
  //   ['get product by id'],
  //   () => ProductsService.getById(id as string),
  //   {
  //     enabled: !!id,
  //     select: ({ data }) => data,
  //   },
  // )

  // const { mutateAsync, isLoading } = useMutation(
  //   ({ id, formData }: Props) => ProductsService.update(id, formData),
  //   {
  //     onSuccess() {
  //       queryClient.invalidateQueries(['get product by id'])
  //     },
  //   },
  // )

  // const onSubmit = async (
  //   values: AddProduct,
  //   formikHelpers: FormikHelpers<AddProduct>,
  // ) => {
  //   try {
  //     if (typeof id === 'string') {
  //       const formData = new FormData()
  //       formData.append('category', values.category)
  //       values.file && formData.append('file', values.file)
  //       formData.append('name', values.name)
  //       formData.append('desc', values.desc)
  //       formData.append('price', values.price)

  //       await mutateAsync({ id, formData })
  //       queryClient.invalidateQueries(['get category by id'])
  //     }
  //   } catch (error) {
  //     if (error && axios.isAxiosError(error)) {
  //       if (error.response?.status === 409) {
  //         formikHelpers.setFieldError('name', error.response?.data.message)
  //       }
  //     }
  //   }
  // }

  return (
    <Wrapper>
      {/* <WrapperAuth>
        <GoBack onClick={() => back()}>Go back</GoBack>
        <Title>Edit Category</Title>
        <Formik
          enableReinitialize
          initialValues={{
            category: data.category || '',
            name: data.name || '',
            desc: data.desc || '',
            file: data.file || '',
            price: data.price || '',
          }}
          validationSchema={addCategorySchema}
          onSubmit={onSubmit}>
          {(formik) => {
            return (
              <Form>
                <FormikField
                  value={formik.values.name}
                  label="Title"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <Button
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  style={{ width: '100%', marginTop: 30 }}
                  isLoading={isLoading}>
                  Update
                </Button>
              </Form>
            )
          }}
        </Formik>
      </WrapperAuth> */}
    </Wrapper>
  )
}
