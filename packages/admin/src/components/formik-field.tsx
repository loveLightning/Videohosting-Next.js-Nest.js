import React from 'react'
import { FieldInputProps } from 'formik'
import styled from 'styled-components'

import { FormikErrorMessage } from 'src/components'

type Props<T> = {
  name: string
  type: string
  value: string
  label?: string
  rest?: React.CSSProperties
  autoComplete?: string
  placeholder?: string
} & FieldInputProps<T>

const Container = styled.div`
  margin-bottom: 15px;
`

const Input = styled.input`
  width: 100%;
  margin: 5px 0 5px;
  height: 40px;
  padding: 0 15px;
  font-family: ${({ theme }) => theme.roboto400};
  background: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.black};
  outline: none;
`

export const FormikField = <T,>({
  name,
  type,
  label,
  value,
  onChange,
  autoComplete,
  placeholder,
  ...rest
}: Props<T>) => {
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <Input
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder ? placeholder : label}
        autoComplete={autoComplete}
        {...rest}
      />
      <FormikErrorMessage name={name} />
    </Container>
  )
}
