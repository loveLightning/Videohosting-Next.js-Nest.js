import * as yup from 'yup'

export const categorySchema = yup.object({
  name: yup.string().nullable().required('Category field is required'),
})
