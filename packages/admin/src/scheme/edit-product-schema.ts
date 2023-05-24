import * as yup from 'yup'

export const editProductSchema = yup.object({
  name: yup.string().required('Name field is required'),
  desc: yup.string().required('Description field is required'),
  price: yup.string().required('Price field is required'),
  category: yup.string().required('Category field is required'),
})
