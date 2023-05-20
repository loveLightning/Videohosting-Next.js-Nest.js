import axios from 'axios'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Button, FormikField } from 'src/components'
import { loginSchema } from 'src/scheme'
import {
  fetchLogin,
  useAppDispatch,
  useAppSelector,
  userSelector,
} from 'src/store'

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
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                  style={{ width: '100%', marginTop: 30 }}
                  isLoading={loading}>
                  log in
                </Button>
              </Form>
            )
          }}
        </Formik>
      </WrapperAuth>
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.light_blue};
  padding-top: 100px;
`

export const WrapperAuth = styled.div`
  margin: 0 auto;
  max-width: 600px;
  padding: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.white};
  border-radius: 20px;
`

export const Title = styled.p`
  font-family: ${({ theme }) => theme.roboto500};
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
`
