import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 100px;
`

export const WrapperAuth = styled.div`
  margin: 0 auto;
  max-width: 600px;
  padding: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.white};
  border-radius: 20px;
`

export const GoBack = styled.p`
  color: ${({ theme }) => theme.blue[0]};
  cursor: pointer;
`

export const Title = styled.p`
  font-family: ${({ theme }) => theme.roboto500};
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
`
