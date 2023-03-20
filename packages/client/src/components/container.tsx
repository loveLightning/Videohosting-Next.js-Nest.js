import styled from 'styled-components'

const ContainerStyled = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 30px;
`

interface Props {
  children: React.ReactNode
}

export const Container = ({ children }: Props) => {
  return <ContainerStyled>{children}</ContainerStyled>
}
