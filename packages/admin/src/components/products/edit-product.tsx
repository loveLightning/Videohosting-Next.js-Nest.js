import { ChangeEvent, createRef, useState } from 'react'
import {
  AddProduct,
  ApiMethods,
  CategoriesService,
  checkFileSize,
  checkFormatFile,
  ProductsService,
} from '@amazon/common/src'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import styled, { useTheme } from 'styled-components'

import {
  Button,
  FileInput,
  FormikField,
  Loader,
  Modal,
  PreviewImage,
} from 'src/components'
import { editProductSchema } from 'src/scheme'
import { GET_IMAGE_URL } from 'src/utils'

import { GoBack, Wrapper, WrapperAuth } from './styled'

interface AvatarPreviewTypes {
  imgSend: null | FormData
  imgRead: string
}
interface Props {
  data: AddProduct
  id: string | number
}

export const EditProducts = () => {
  const {
    query: { id },
    back,
  } = useRouter()
  const inputRef = createRef<HTMLInputElement>()
  const { red } = useTheme()

  const queryClient = useQueryClient()
  const [errorMsgFile, setErrorMsgFile] = useState('')
  const [isShowModal, setIsShowModal] = useState(false)

  const [updateAvatarPreview, setUpdateAvatarPreview] =
    useState<AvatarPreviewTypes>({
      imgRead: '',
      imgSend: null,
    })

  const { data, isLoading } = useQuery(
    ['get product by id'],
    () => ProductsService.getById(id as string),
    {
      enabled: !!id,
      select: ({ data }) => data,
    },
  )

  const imageUrl = GET_IMAGE_URL(
    ApiMethods.Products,
    'products',
    data?.images[0],
  )

  const { data: categories } = useQuery(
    ['get all categories from edit'],
    () => CategoriesService.getAll(),
    {
      select: ({ data }) => data,
    },
  )

  const updateProfile = useMutation(
    ({ id, data }: Props) => ProductsService.update(id, data),
    {
      onSuccess() {
        queryClient.invalidateQueries(['get product by id'])
      },
    },
  )

  const updateImgOfProfile = useMutation(
    ({ id, data }: { id: number; data: FormData }) =>
      ProductsService.updateImage(id, data),
    {
      onSuccess() {
        queryClient.invalidateQueries(['get product by id'])
      },
    },
  )

  const changeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const files = target.files

    if (files) {
      if (!checkFileSize(files[0]) || !checkFormatFile(files[0])) {
        setErrorMsgFile('Choose file a png, jpeg or jpg ')

        return
      }
      const formData = new FormData()
      formData.append('file', files[0])

      setErrorMsgFile('')
      setUpdateAvatarPreview((prev) => ({
        ...prev,
        imgSend: formData,
      }))
      const fileReader = new FileReader()
      fileReader.readAsDataURL(files[0])

      fileReader.onload = () => {
        setUpdateAvatarPreview((prev) => ({
          ...prev,
          imgRead: fileReader.result as string,
        }))
      }
    }
    setIsShowModal(true)
  }

  const onSubmit = async (
    values: AddProduct,
    formikHelpers: FormikHelpers<AddProduct>,
  ) => {
    try {
      if (typeof id === 'string' && data?.id) {
        await updateProfile.mutateAsync({ id: data.id, data: values })
      }
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          formikHelpers.setFieldError('name', error.response?.data.message)
        }
      }
    } finally {
    }
  }

  const setNewAvatar = async () => {
    try {
      if (data?.id && updateAvatarPreview.imgSend !== null) {
        updateImgOfProfile.mutateAsync({
          id: data?.id,
          data: updateAvatarPreview.imgSend,
        })
      }
    } catch (error) {
    } finally {
      setIsShowModal(false)
    }
  }

  const uploadClick = () => {
    inputRef.current?.click()
  }

  const renderLoading = () => {
    if (isLoading) return <Loader />
  }

  return (
    <Wrapper>
      <WrapperAuth>
        <GoBack onClick={() => back()}>Go back</GoBack>
        <Title>Edit Product</Title>
        {renderLoading}
        {data && (
          <Formik
            enableReinitialize
            initialValues={{
              category: data.category.name || '',
              desc: data.description || '',
              name: data.name || '',
              price: String(data.price) || '',
            }}
            validationSchema={editProductSchema}
            onSubmit={onSubmit}>
            {(formik) => {
              return (
                <Form>
                  <FormikField
                    placeholder="Enter product..."
                    value={formik.values.name}
                    label="Product name"
                    name="name"
                    onBlur={formik.handleBlur}
                    type="text"
                    onChange={formik.handleChange}
                  />

                  <FormikField
                    placeholder="Enter description..."
                    value={formik.values.desc}
                    label="Product description "
                    name="desc"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />

                  {imageUrl ? (
                    <PreviewImage priority={true} file={imageUrl} />
                  ) : (
                    <p>You dont have an image</p>
                  )}

                  <FileInput
                    ref={inputRef}
                    label="Upload file"
                    accept="image/*"
                    onChange={(e) => changeAvatarHandler(e)}>
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
                    onBlur={formik.handleBlur}
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
                    onBlur={formik.handleBlur}
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
                    isLoading={updateProfile.isLoading}>
                    Add product
                  </Button>
                </Form>
              )
            }}
          </Formik>
        )}
      </WrapperAuth>

      {isShowModal && updateAvatarPreview && (
        <Modal
          style={{ height: 'auto' }}
          isShow={isShowModal}
          onClose={() => setIsShowModal(false)}
          title="Set avatar">
          <WrapperModal>
            {updateAvatarPreview.imgRead && (
              <PreviewImage
                file={updateAvatarPreview.imgRead}
                priority={true}
              />
            )}

            <Button style={{ marginTop: 40 }} onClick={setNewAvatar}>
              Set a new avatar
            </Button>
          </WrapperModal>
        </Modal>
      )}
    </Wrapper>
  )
}

const Title = styled.p`
  margin-top: 40px;
  font-family: ${({ theme }) => theme.roboto500};
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
`

const WrapperModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: auto;
`
