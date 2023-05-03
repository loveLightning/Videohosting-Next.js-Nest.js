import { useState } from 'react'
import axios from 'axios'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

import { Button, FormikField, Modal } from 'src/components'
import { loginSchema } from 'src/scheme'
import {
  changeAuthMode,
  fetchLogin,
  useAppDispatch,
  useAppSelector,
  userSelector,
} from 'src/store'

import {
  RegisterText,
  Title,
  TogglePage,
  Wrapper,
  WrapperAuth,
  WrapToggle,
} from '../styled'

interface InitialValuesTypes {
  email: string
  password: string
}

const initialValues: InitialValuesTypes = {
  email: '',
  password: '',
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const { replace } = useRouter()

  const [showModal, setShowModal] = useState(false)
  const [isErrorConfirm, setIsErrorConfirm] = useState()

  const { loading } = useAppSelector(userSelector)

  const onSubmit = async (
    values: InitialValuesTypes,
    formikHelpers: FormikHelpers<InitialValuesTypes>,
  ) => {
    try {
      await dispatch(fetchLogin(values)).unwrap()
      replace('/')
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 404) {
          formikHelpers.setFieldError('password', error.response?.data.message)
          formikHelpers.setFieldError('email', error.response?.data.message)
        }

        if (error.response?.status === 403) {
          setIsErrorConfirm(error.response?.data.message)
          setShowModal(true)
        }
      }
    }
  }

  return (
    <Wrapper>
      <WrapperAuth>
        <Title>Login</Title>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={loginSchema}>
          {(formik) => {
            return (
              <Form>
                <FormikField
                  value={formik.values.email}
                  label="Email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormikField
                  value={formik.values.password}
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="on"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Button
                  disabled={!(formik.dirty && formik.isValid)}
                  style={{ width: '100%', marginTop: 30 }}
                  isLoading={loading}>
                  log in
                </Button>
              </Form>
            )
          }}
        </Formik>
        <WrapToggle>
          <RegisterText>Not registered yet?</RegisterText>
          <TogglePage onClick={() => dispatch(changeAuthMode())}>
            Sign up
          </TogglePage>
        </WrapToggle>
        {showModal && (
          <Modal
            onClose={() => setShowModal(false)}
            isShow={showModal}
            style={{ width: 400, height: 200 }}>
            <DescError>{isErrorConfirm}</DescError>
          </Modal>
        )}
      </WrapperAuth>
    </Wrapper>
  )
}

const DescError = styled.p`
  font-size: 16px;
  font-family: ${({ theme }) => theme.roboto400};
  text-align: center;
`
