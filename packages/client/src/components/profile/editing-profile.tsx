import 'react-phone-input-2/lib/style.css'

import { ChangeEvent, createRef, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import PhoneInput from 'react-phone-input-2'
import {
  checkFileSize,
  checkFormatFile,
  UsersService,
} from '@amazon/common/src'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, Formik } from 'formik'
import styled, { useTheme } from 'styled-components'

import {
  Button,
  FileInput,
  FormikField,
  Modal,
  PreviewImage,
} from 'src/components'
import { PROFILE_IMAGE_URL } from 'src/constants'
import { editingProfileSchema } from 'src/scheme'
import { IFullProfile, IUpdateUser } from 'src/types'

interface AvatarPreviewTypes {
  img: string
  scale: number
}

interface InitialValuesTypes {
  name: string
  phone: string
}

interface Props {
  profile: IFullProfile
}

export const EditingProfile = ({ profile }: Props) => {
  const queryClient = useQueryClient()
  const mutationProfile = useMutation(
    (data: IUpdateUser) => UsersService.updateProfile(data),
    {
      onSuccess: () => queryClient.invalidateQueries(['get profile']),
    },
  )

  const mutationAvatar = useMutation(
    (formData: FormData) => UsersService.updateAvatar(formData),
    {
      onSuccess: () => queryClient.invalidateQueries(['get profile']),
    },
  )

  const [updateAvatarPreview, setUpdateAvatarPreview] =
    useState<AvatarPreviewTypes>({
      img: '',
      scale: 1,
    })

  const [isLoading, setIsLoading] = useState(false)
  const imageUrl = PROFILE_IMAGE_URL(profile?.avatarPath, 'profile')
  const [isShowModal, setIsShowModal] = useState(false)
  const [errorMsgFile, setErrorMsgFile] = useState('')
  const { red } = useTheme()

  const editor = useRef<AvatarEditor>(null)
  const inputRef = createRef<HTMLInputElement>()

  const parsingPhoneNums = profile.phone.replace(/[^\d]+/g, '')

  const onSubmit = async (values: InitialValuesTypes) => {
    try {
      setIsLoading(true)

      mutationProfile.mutate(values)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const changeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const files = target.files

    if (files) {
      if (!checkFileSize(files[0]) || !checkFormatFile(files[0])) {
        setErrorMsgFile('Choose file a png, jpeg or jpg ')

        return
      }

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
    setIsShowModal(true)
  }

  const setNewAvatar = async () => {
    const canvas = editor.current?.getImage()

    canvas?.toBlob(async (blob) => {
      const formData = new FormData()

      if (blob) {
        formData.append('file', blob)
      }

      mutationAvatar.mutate(formData)
      setIsShowModal(false)
    })
  }

  const uploadClick = () => {
    inputRef.current?.click()
  }

  return (
    <Wrap>
      <Title>Edit profile</Title>
      <Formik
        enableReinitialize
        initialValues={{
          name: profile.name || '',
          phone: parsingPhoneNums || '',
        }}
        validationSchema={editingProfileSchema}
        onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form>
              {imageUrl ? (
                <PreviewImage file={imageUrl} />
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
              {isShowModal && updateAvatarPreview && (
                <Modal
                  style={{ height: 'auto' }}
                  isShow={isShowModal}
                  onClose={() => setIsShowModal(false)}
                  title="Set avatar">
                  <WrapperModal>
                    <AvatarEditor
                      ref={editor}
                      image={updateAvatarPreview.img}
                      width={350}
                      height={350}
                      border={50}
                      scale={updateAvatarPreview.scale}
                      color={[0, 0, 0, 0.5]} // RGBA
                    />

                    <input
                      type="range"
                      min={1}
                      max={2}
                      step={0.01}
                      value={updateAvatarPreview.scale}
                      onChange={(e) =>
                        setUpdateAvatarPreview((prev) => ({
                          ...prev,
                          scale: +e.target.value,
                        }))
                      }
                    />

                    <Button style={{ marginTop: 40 }} onClick={setNewAvatar}>
                      Set a new avatar
                    </Button>
                  </WrapperModal>
                </Modal>
              )}

              <FormikField
                value={formik.values.name}
                label="Name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <label>Phone</label>
              <PhoneInput
                inputProps={{
                  name: 'phone',
                }}
                country="us"
                countryCodeEditable={false}
                onBlur={formik.handleBlur}
                onChange={(phone: string) =>
                  formik.setFieldValue('phone', phone)
                }
                value={formik.values.phone}
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
    </Wrap>
  )
}

const Wrap = styled.div`
  margin-bottom: 100px;
`

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
