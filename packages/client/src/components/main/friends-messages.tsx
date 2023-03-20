import { useState } from 'react'
import styled from 'styled-components'

import { Separator } from 'src/components'

const Wrapper = styled.div``

const MessagesText = styled.p`
  margin-bottom: 20px;
`

const Input = styled.input`
  margin-top: 20px;
  padding: 0 15px;
  height: 30px;
  width: 100%;
  outline: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.grey[1]};
  border: 1px solid ${({ theme }) => theme.grey[1]};
  transition: 0.4s ease all;
  &:focus {
    background-color: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.blue};
  }
`

export const FriendsMessages = () => {
  const [inputValue, setInputValue] = useState('')

  return (
    <Wrapper>
      <MessagesText>Messages</MessagesText>
      <Separator />
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search message"
      />
    </Wrapper>
  )
}
