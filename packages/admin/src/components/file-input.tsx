import React from 'react'
import styled from 'styled-components'

interface FileInputProps {
  label?: string
  name?: string
  accept: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  children: React.ReactNode
}

const FileInputContainer = styled.div``

const Input = styled.input`
  display: none;
`

// eslint-disable-next-line react/display-name
export const FileInput = React.forwardRef(
  (props: FileInputProps, inputRef: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <>
        <FileInputContainer>
          {props.children}
          <Input
            value=""
            ref={inputRef}
            accept={props.accept}
            type="file"
            id={props.name}
            onChange={(e) => props.onChange(e)}
          />
        </FileInputContainer>
      </>
    )
  },
)
