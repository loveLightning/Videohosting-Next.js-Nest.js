import { CategoriesService } from '@amazon/common/src'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'

import { Button, FormikField } from 'src/components'
import { addCategorySchema } from 'src/scheme'

import { GoBack, Title, Wrapper, WrapperAuth } from './styled'

interface InitialValuesTypes {
  name: string
}

interface UpdateCategory {
  id: string
  name: string
}

export const EditCategories = () => {
  const {
    query: { id },
    back,
  } = useRouter()

  const queryClient = useQueryClient()

  const { data } = useQuery(
    ['get category by id'],
    () => CategoriesService.getById(id as string),
    {
      enabled: !!id,
      select: ({ data }) => data,
    },
  )

  const { mutateAsync, isLoading } = useMutation(
    ({ id, name }: UpdateCategory) => CategoriesService.update(id, name),
    {
      onSuccess() {
        queryClient.invalidateQueries(['get category by id'])
      },
    },
  )

  const onSubmit = async (
    values: InitialValuesTypes,
    formikHelpers: FormikHelpers<InitialValuesTypes>,
  ) => {
    try {
      if (data?.name && typeof id === 'string') {
        await mutateAsync({ id, name: values.name })
        queryClient.invalidateQueries(['get category by id'])
      }
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          formikHelpers.setFieldError('name', error.response?.data.message)
        }
      }
    }
  }

  return (
    <Wrapper>
      <WrapperAuth>
        <GoBack onClick={() => back()}>Go back</GoBack>
        <Title>Edit Category</Title>
        <Formik
          enableReinitialize
          initialValues={{
            name: data?.name || '',
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
      </WrapperAuth>
    </Wrapper>
  )
}
