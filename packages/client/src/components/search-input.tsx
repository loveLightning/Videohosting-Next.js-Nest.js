import { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import styled from 'styled-components'

import { SearchIcon } from 'src/icons'

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      Router.push({ pathname: 'search', query: { termSearch: searchValue } })
    }
  }

  return (
    <Wrapper>
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        placeholder="Search..."
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <WrapSearch
        href={{ pathname: 'search', query: { termSearch: searchValue } }}>
        <SearchIcon width={20} height={20} />
      </WrapSearch>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-left: auto;
  min-width: 300px;
  margin-right: auto;
  display: flex;
  align-items: center;
`

const Input = styled.input`
  padding: 7px 10px;
  font-family: ${({ theme }) => theme.roboto400};
  font-size: 18px;
  outline: none;
  border-radius: 10px 0 0 10px;
  width: 100%;
  background-color: ${({ theme }) => theme.grey[3]};
  border: ${({ theme }) => theme.grey[0]} solid 1px;
  color: ${({ theme }) => theme.white};

  &::placeholder {
    color: ${({ theme }) => theme.grey[0]};
    font-family: ${({ theme }) => theme.roboto400};
    font-size: 18px;
  }
`

const WrapSearch = styled(Link)`
  background-color: ${({ theme }) => theme.red[0]};
  padding: 7px 10px;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  position: relative;
`
