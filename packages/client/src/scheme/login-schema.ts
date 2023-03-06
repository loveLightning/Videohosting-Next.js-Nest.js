import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email field is required'),
  password: yup
    .string()
    .required('Password field is required')
    .min(8, 'Password must be 8 characters long'),
})
