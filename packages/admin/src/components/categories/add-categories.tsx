import { useState } from 'react'
import { CategoriesService } from '@amazon/common/src'
import axios from 'axios'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'

import { Button, FormikField } from 'src/components'
import { categorySchema } from 'src/scheme'

import { GoBack, Title, Wrapper, WrapperAuth } from './styled'

interface InitialValuesTypes {
  name: string
}

const initialValues: InitialValuesTypes = {
  name: '',
}

export const AddCategories = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { back } = useRouter()

  const onSubmit = async (
    values: InitialValuesTypes,
    formikHelpers: FormikHelpers<InitialValuesTypes>,
  ) => {
    setIsLoading(true)

    try {
      await CategoriesService.create(values.name)
      formikHelpers.resetForm()
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          formikHelpers.setFieldError('name', error.response?.data.message)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Wrapper>
      <WrapperAuth>
        <GoBack onClick={() => back()}>Go back</GoBack>
        <Title>Add category</Title>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={categorySchema}>
          {(formik) => {
            return (
              <Form>
                <FormikField
                  placeholder="Enter new category..."
                  value={formik.values.name}
                  label="Add category"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                />

                <Button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                  style={{ width: '100%', marginTop: 30 }}
                  isLoading={isLoading}>
                  Add category
                </Button>
              </Form>
            )
          }}
        </Formik>
      </WrapperAuth>
    </Wrapper>
  )
}
