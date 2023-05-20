import { ErrorMessage } from 'formik'

interface Props {
  name: string
}

export const FormikErrorMessage = ({ name }: Props) => {
  return (
    <ErrorMessage name={name}>
      {(errMessage) => {
        return <div style={{ color: 'red' }}>{errMessage}</div>
      }}
    </ErrorMessage>
  )
}
