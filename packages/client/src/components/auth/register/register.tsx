import axios from 'axios'
import { Form, Formik, FormikHelpers } from 'formik'
import styled from 'styled-components'

import { Button, FormikField } from 'src/components'
import { registerSchema } from 'src/scheme'
import {
  fetchRegister,
  useAppDispatch,
  useAppSelector,
  userSelector,
} from 'src/store'
import { fetchLogout } from 'src/store'

import {
  RegisterText,
  Title,
  TogglePage,
  Wrapper,
  WrapperAuth,
  WrapToggle,
} from '../styled'

interface InitialValuesTypes {
  name: string
  email: string
  password: string
}

const initialValues: InitialValuesTypes = {
  name: '',
  email: '',
  password: '',
}

export const Register = () => {
  const { user, isAuth, loading } = useAppSelector(userSelector)

  const dispatch = useAppDispatch()

  const { isActivated } = user.user ?? ''

  const onSubmit = async (
    values: InitialValuesTypes,
    formikHelpers: FormikHelpers<InitialValuesTypes>,
  ) => {
    try {
      await dispatch(fetchRegister(values)).unwrap()
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          formikHelpers.setFieldError('email', error.response?.data.message)
        }
      }
    }
  }

  return (
    <Wrapper>
      <WrapperAuth>
        <Title>Register</Title>

        {!isAuth && !isActivated && (
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={registerSchema}>
            {(formik) => {
              return (
                <Form>
                  <FormikField
                    value={formik.values.name}
                    label="Name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
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
                    style={{ width: '100%', marginTop: 30 }}
                    isLoading={loading}>
                    Register
                  </Button>
                </Form>
              )
            }}
          </Formik>
        )}

        {isAuth && !isActivated && (
          <WrapConfirm>
            <TextConfirm>You have to confirm your email</TextConfirm>

            <Note onClick={async () => await dispatch(fetchLogout())}>
              Register another mail
            </Note>
          </WrapConfirm>
        )}

        <WrapToggle>
          <RegisterText>Not registered yet?</RegisterText>
          <TogglePage href={'/auth/login'}>Sign in</TogglePage>
        </WrapToggle>
      </WrapperAuth>
    </Wrapper>
  )
}

const WrapConfirm = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const TextConfirm = styled.div`
  color: ${({ theme }) => theme.black};
  font-size: 24px;
  margin-bottom: 100px;
`

const Note = styled.p`
  color: ${({ theme }) => theme.blue};
  cursor: pointer;
`
