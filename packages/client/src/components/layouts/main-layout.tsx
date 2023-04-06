import styled from 'styled-components'

import { Header, Sidebar } from 'src/components'

interface Props {
  children: React.ReactNode
}

export const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <GridTemplate>
        <Sidebar />

        <Main>{children}</Main>
      </GridTemplate>
    </>
  )
}

const GridTemplate = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`

const Main = styled.section`
  padding: 30px;
`
