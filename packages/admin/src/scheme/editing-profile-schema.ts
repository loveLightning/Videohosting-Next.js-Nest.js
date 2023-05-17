import * as yup from 'yup'

import { phoneRegExp } from 'src/constants'

export const editingProfileSchema = yup.object({
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('A phone is required'),
  name: yup.string().required('A name is required'),
})
