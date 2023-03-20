'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

import { Container } from 'src/components'
import { Main } from 'src/components'
import { FriendsMessages, Navbar } from 'src/components/main'

const Wrapper = styled.div`
  display: grid;
  padding-top: 20px;
  grid-template-columns: 1fr 4fr 12fr;
  grid-column-gap: 20px;
`

export default function Page() {
  const { push } = useRouter()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      push('/')
    } else {
      push('/auth/register')
    }
  }, [push])

  return (
    <Container>
      <Wrapper>
        <Navbar />
        <FriendsMessages />
        <Main />
      </Wrapper>
    </Container>
  )
}
