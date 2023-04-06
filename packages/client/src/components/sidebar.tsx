import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import styled from 'styled-components'

import { CategoriesService } from 'src/api'
import { Loader } from 'src/components'
import { LogOutIcon } from 'src/icons'
import { fetchLogout, useAppDispatch } from 'src/store'

export const Sidebar = () => {
  const { data: categories, isLoading } = useQuery(
    ['get categories'],
    () => CategoriesService.getAll(),
    {
      select: ({ data }) => data,
    },
  )
  const dispatch = useAppDispatch()

  return (
    <Wrapper>
      {isLoading && <Loader />}
      <WrapCateries>
        <NameOfSidebar>Categories:</NameOfSidebar>
        {categories?.length &&
          categories.map((el) => (
            <CategoryText key={el.id} href={`/category/${el.slug}`}>
              {el.name}
            </CategoryText>
          ))}
      </WrapCateries>

      {!categories?.length && <NotFound>Categories not found</NotFound>}
      <LogOut onClick={async () => await dispatch(fetchLogout())}>
        <LogOutIcon />
        <LogOutText>Log out</LogOutText>
      </LogOut>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.dark_blue};
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
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

const CategoryText = styled(Link)`
  color: ${({ theme }) => theme.white};
  cursor: pointer;
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
`

const LogOutText = styled.p`
  color: ${({ theme }) => theme.white};
  font-size: 14px;
`
