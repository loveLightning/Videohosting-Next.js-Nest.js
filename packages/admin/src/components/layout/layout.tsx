import styled from 'styled-components'

import { Sidebar } from 'src/components'

interface Props {
  children: React.ReactNode
}

export const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Wrapper>
        <Sidebar />

        <Main>{children}</Main>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  position: relative;
`

const Main = styled.section`
  padding: 30px 30px 50px;
  margin-left: 250px;
  min-height: 100vh;
  background: ${({ theme }) => theme.grey[1]};
`
