import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

import { NavbarData } from './types'

const Wrapper = styled.div``

const ImageAvatar = styled(Image)`
  margin-bottom: 50px;
`

const WrapItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export const Navbar = () => {
  const pathname = usePathname()

  return (
    <Wrapper>
      {/* <ImageAvatar src={''} alt="avatar" /> */}

      <WrapItem>
        {NavbarData?.map(({ href, Icon, id }) => (
          <Link key={id} href={href}>
            <Icon isActive={pathname === href} />
          </Link>
        ))}
      </WrapItem>
    </Wrapper>
  )
}
