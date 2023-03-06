import React from 'react'
import styled from 'styled-components'

import { FormikErrorMessage } from 'src/components'

interface Props {
  name: string
  type: string
  onChange: (e: React.ChangeEvent<any>) => void
  onBlur?: (e: any) => void
  value: string
  label?: string
  rest?: React.CSSProperties
}

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

export const FormikField = ({
  name,
  type,
  label,
  value,
  onChange,
  onBlur,
  ...rest
}: Props) => {
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <Input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        name={name}
        id={name}
        placeholder={label}
        {...rest}
      />
      <FormikErrorMessage name={name} />
    </Container>
  )
}
