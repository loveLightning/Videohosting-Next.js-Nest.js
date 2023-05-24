import { SUPPORTED_FORMATS } from '@amazon/common/src'
import * as yup from 'yup'

export const addProductSchema = yup.object({
  name: yup.string().required('Name field is required'),
  desc: yup.string().required('Description field is required'),
  price: yup.string().required('Price field is required'),
  category: yup.string().required('Category field is required'),
  file: yup
    .mixed()
    .nullable()
    .test(
      'Fichier taille',
      'upload file',
      (value: unknown) =>
        !value || (value instanceof File && value.size <= 1024 * 1024),
    )
    .test(
      'format',
      'upload file',
      (value: unknown) =>
        !value ||
        (value instanceof File && SUPPORTED_FORMATS.includes(value.type)),
    ),
})
