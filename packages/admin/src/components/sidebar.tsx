import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import {
  fetchLogout,
  useAppDispatch,
  useAppSelector,
  userSelector,
} from 'src/store'
import { sidebarData } from 'src/types'

export const Sidebar = () => {
  const { asPath, push } = useRouter()

  const { user } = useAppSelector(userSelector)
  const isUser = user?.user?.isActivated
  const dispatch = useAppDispatch()

  const logOut = async () => {
    await dispatch(fetchLogout())
    push('/auth')
  }
  console.log(asPath)

  return (
    <Wrapper>
      <WrapCateries>
        {sidebarData?.map((el) => (
          <CategoryText
            key={el.href}
            active={asPath && asPath === `${el.href}` ? 'true' : 'false'}
            href={el.href}>
            {el.title}
          </CategoryText>
        ))}
      </WrapCateries>

      {isUser && (
        <LogOut onClick={logOut}>
          <LogOutText>Log out</LogOutText>
        </LogOut>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.dark_blue};
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  position: absolute;
  left: 0;
  right: 250px;
  width: 250px;
  top: 0;
  bottom: 0;
`

const WrapCateries = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`

interface CategoryTextStyled {
  active: 'true' | 'false'
}

// eslint-disable-next-line prettier/prettier
const CategoryText = styled(Link) <CategoryTextStyled>`
  color: ${({ theme, active }) =>
    active === 'true' ? theme.green[0] : theme.white};
  cursor: pointer;
  font-family: ${({ theme }) => theme.roboto400};
  font-size: 18px;
  margin-left: 15px;
`

const LogOut = styled.div`
  color: ${({ theme }) => theme.white};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  width: fit-content;
  margin-top: 50px;
`

const LogOutText = styled.p`
  color: ${({ theme }) => theme.white};
  font-size: 14px;
`
