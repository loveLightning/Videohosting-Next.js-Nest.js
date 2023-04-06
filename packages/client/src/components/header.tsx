import Link from 'next/link'
import { FavoritesIcon, LogoIcon } from 'src/icons'
import styled from 'styled-components'
import { Search, Container } from 'src/components'

export const Header = () => {
  return (
    <Wrap>
      <Container>
        <WrapHeader>
          <Link href="/">
            <LogoIcon />
          </Link>
          <Search />
          <div>
            <Link href='/favorites'>
              <FavoritesIcon />
              {/* <HeaderCart />
          <HeaderProfile /> */}
            </Link>
          </div>
        </WrapHeader>
      </Container >
    </Wrap>
  )
}

const Wrap = styled.header`
  background-color: ${({ theme }) => theme.grey[3]};
`

const WrapHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1.2fr;
  width: 100%;
  padding: 20px 0;
  height: 90px;
`
