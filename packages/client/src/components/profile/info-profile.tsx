import styled from 'styled-components'

import { IProfile } from 'src/types'

export const InfoProfile = ({
  email,
  name,
  phone,
}: Omit<IProfile, 'id' | 'avatarPath'>) => {
  return (
    <Info>
      <Item>
        <NameItem>Email:</NameItem>
        <ValueItem>{email}</ValueItem>
      </Item>
      <Item>
        <NameItem>Name:</NameItem>
        <ValueItem>{name}</ValueItem>
      </Item>
      <Item>
        <NameItem>Phone:</NameItem>
        <ValueItem>{phone}</ValueItem>
      </Item>
    </Info>
  )
}

const Info = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;
  margin-left: 200px;
`

const Item = styled.div`
  display: flex;
  gap: 30px;
`
const NameItem = styled.p`
  font-family: ${({ theme }) => theme.roboto400};
  font-size: 20px;
`
const ValueItem = styled.p`
  font-family: ${({ theme }) => theme.roboto400};
  font-size: 20px;
`
