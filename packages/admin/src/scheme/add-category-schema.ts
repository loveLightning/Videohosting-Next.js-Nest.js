import * as yup from 'yup'

export const addCategorySchema = yup.object({
  name: yup.string().nullable().required('Category field is required'),
})
