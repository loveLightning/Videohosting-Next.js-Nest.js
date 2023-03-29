import axios from 'axios'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { Button, FormikField } from 'src/components'
import { loginSchema } from 'src/scheme'
import { fetchLogin, useAppDispatch } from 'src/store'

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
  const router = useRouter()
  const dispatch = useAppDispatch()

  const onSubmit = async (
    values: InitialValuesTypes,
    // formikHelpers: FormikHelpers<InitialValuesTypes>,
  ) => {
    try {
      dispatch(fetchLogin(values))
      router.push('/')
    } catch (err) {
      if (axios.isAxiosError(err)) {
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Button
                  disabled={!(formik.dirty && formik.isValid)}
                  style={{ width: '100%', marginTop: 30 }}>
                  Log in
                </Button>
              </Form>
            )
          }}
        </Formik>
        <WrapToggle>
          <RegisterText>Not registered yet?</RegisterText>
          <TogglePage href={'/auth/register'}>Sign up</TogglePage>
        </WrapToggle>
      </WrapperAuth>
    </Wrapper>
  )
}
