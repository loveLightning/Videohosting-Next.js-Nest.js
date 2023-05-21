import { ChangeEvent, createRef, useState } from 'react'
import {
  AddProduct,
  CategoriesService,
  checkFileSize,
  checkFormatFile,
  ProductsService,
} from '@amazon/common/src'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { useTheme } from 'styled-components'

import { Button, FileInput, FormikField, PreviewImage } from 'src/components'
import { addProductSchema } from 'src/scheme'

import { GoBack, Title, Wrapper, WrapperAuth } from './styled'

const initialValues: AddProduct = {
  name: '',
  desc: '',
  price: '',
  category: '',
  file: null,
}

interface AvatarPreviewTypes {
  img: string
  scale: number
}

export const AddProducts = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { back } = useRouter()
  const { red } = useTheme()

  const [errorMsgFile, setErrorMsgFile] = useState('')
  const [updateAvatarPreview, setUpdateAvatarPreview] =
    useState<AvatarPreviewTypes>({
      img: '',
      scale: 1,
    })

  const inputRef = createRef<HTMLInputElement>()

  const { data: categories } = useQuery(
    ['get all categories from create'],
    () => CategoriesService.getAll(),
    {
      select: ({ data }) => data,
    },
  )

  const onSubmit = async (
    values: AddProduct,
    formikHelpers: FormikHelpers<AddProduct>,
  ) => {
    setIsLoading(true)

    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('category', values.category)
    formData.append('desc', values.desc)
    values.file && formData.append('file', values.file)
    formData.append('price', values.price)

    try {
      await ProductsService.create(formData)
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

  const changeAvatarHandler = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => void,
  ) => {
    const target = e.target as HTMLInputElement
    const files = target.files

    if (files) {
      if (!checkFileSize(files[0]) || !checkFormatFile(files[0])) {
        setErrorMsgFile('Choose file a png, jpeg or jpg ')

        return
      }
      setFieldValue('file', files[0])

      setErrorMsgFile('')
      const fileReader = new FileReader()
      fileReader.readAsDataURL(files[0])

      fileReader.onload = () => {
        setUpdateAvatarPreview((prev) => ({
          ...prev,
          img: fileReader.result as string,
        }))
      }
    }
  }

  const uploadClick = () => {
    inputRef.current?.click()
  }

  return (
    <Wrapper>
      <WrapperAuth>
        <GoBack onClick={() => back()}>Go back</GoBack>
        <Title>Add product</Title>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={addProductSchema}>
          {(formik) => {
            return (
              <Form>
                <FormikField
                  placeholder="Enter product..."
                  value={formik.values.name}
                  label="Product name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                />

                <FormikField
                  placeholder="Enter description..."
                  value={formik.values.desc}
                  label="Product description "
                  name="desc"
                  type="text"
                  onChange={formik.handleChange}
                />

                {updateAvatarPreview.img ? (
                  <PreviewImage file={updateAvatarPreview.img} />
                ) : (
                  <p>You dont have an image</p>
                )}

                <FileInput
                  ref={inputRef}
                  label="Upload file"
                  accept="image/*"
                  onChange={(e) =>
                    changeAvatarHandler(e, formik.setFieldValue)
                  }>
                  {errorMsgFile && (
                    <p style={{ color: red[0] }}>{errorMsgFile}</p>
                  )}

                  <Button onClick={uploadClick}>Set avatar</Button>
                </FileInput>

                <FormikField
                  placeholder="Enter price..."
                  value={formik.values.price}
                  label="Product price"
                  name="price"
                  type="number"
                  onChange={formik.handleChange}
                />

                <p>Product category</p>
                <input
                  value={formik.values.category}
                  style={{ width: '100%', height: 40, padding: '0 15px' }}
                  placeholder="Choose category or create one"
                  type="text"
                  name="category"
                  list="category"
                  onChange={formik.handleChange}
                />
                <datalist id="category">
                  {categories?.map((el) => (
                    <option key={el.id} value={el.name}></option>
                  ))}
                </datalist>

                <Button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                  style={{ width: '100%', marginTop: 30 }}
                  isLoading={isLoading}>
                  Add product
                </Button>
              </Form>
            )
          }}
        </Formik>
      </WrapperAuth>
    </Wrapper>
  )
}
