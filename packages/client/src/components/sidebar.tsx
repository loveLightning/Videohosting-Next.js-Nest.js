import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { CategoriesService } from 'src/api'
import { Loader } from 'src/components'
import { LogOutIcon } from 'src/icons'
import {
  fetchLogout,
  useAppDispatch,
  useAppSelector,
  userSelector,
} from 'src/store'

export const Sidebar = () => {
  const { data: categories, isLoading } = useQuery(
    ['get categories'],
    () => CategoriesService.getAll(),
    {
      select: ({ data }) => data,
    },
  )
  const { asPath } = useRouter()

  const { user } = useAppSelector(userSelector)
  const isUser = user?.user?.isActivated
  const dispatch = useAppDispatch()

  return (
    <Wrapper>
      {isLoading && <Loader />}
      <WrapCateries>
        <NameOfSidebar>Categories:</NameOfSidebar>
        <CategoryText active={!!(asPath && asPath === `/`)} href={'/'}>
          All
        </CategoryText>
        {categories?.length &&
          categories.map((el) => (
            <CategoryText
              active={!!(asPath && asPath === `/category/${el.slug}`)}
              key={el.id}
              href={`/category/${el.slug}`}>
              {el.name}
            </CategoryText>
          ))}
      </WrapCateries>

      {!categories?.length && <NotFound>Categories not found</NotFound>}
      {isUser && (
        <LogOut onClick={async () => await dispatch(fetchLogout())}>
          <LogOutIcon />
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

const NameOfSidebar = styled.p`
  color: ${({ theme }) => theme.white};
  font-size: 20px;
  font-family: ${({ theme }) => theme.roboto500};
  margin-bottom: 20px;
`

interface CategoryTextStyled {
  active: boolean
}

// eslint-disable-next-line prettier/prettier
const CategoryText = styled(Link) <CategoryTextStyled>`
  color: ${({ theme, active }) => (active ? theme.green[0] : theme.white)};
  cursor: pointer;
  font-family: ${({ theme }) => theme.roboto400};
  font-size: 18px;
  margin-left: 15px;
`

const NotFound = styled.p``

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
