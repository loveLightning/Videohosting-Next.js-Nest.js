import { useState } from 'react'
import { CartService } from '@amazon/common/src'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled, { useTheme } from 'styled-components'

import { ModalUnauth, SearchInput } from 'src/components'
import { BasketIcon, LogoIcon, ProfileIcon } from 'src/icons'
import {
  fetchCheckAuth,
  useAppDispatch,
  useAppSelector,
  userSelector,
} from 'src/store'

export const Header = () => {
  const dispatch = useAppDispatch()
  const { push } = useRouter()
  const { white } = useTheme()

  const {
    user: { user },
  } = useAppSelector(userSelector)

  const [isShowModal, setIsShowModal] = useState(false)

  const { data: cart } = useQuery(
    ['get cart from catalog'],
    () => CartService.getCart(),
    {
      select: ({ data }) => data,
      enabled: !!user?.isActivated,
    },
  )

  const checkRedirect = async (path: string) => {
    if (Cookies.get('accessToken')) {
      try {
        await dispatch(fetchCheckAuth()).unwrap()

        push(path)

        return
      } catch (error) {
        setIsShowModal(true)
      }
    } else {
      setIsShowModal(true)
    }
  }

  return (
    <>
      <Wrap>
        <WrapHeader>
          <Link href="/">
            <LogoIcon />
          </Link>
          <SearchInput />
          <WrapPanel>
            {/* <WrapIcon onClick={checkRedirect}>
              <FavoritesIcon active={true} />
            </WrapIcon> */}

            <WrapBasket onClick={() => checkRedirect('/cart')}>
              {cart && (
                <WrapCount>
                  <CountBasket>{cart?.cartItems?.length}</CountBasket>
                </WrapCount>
              )}

              <BasketIcon />
            </WrapBasket>

            <WrapIcon onClick={() => checkRedirect('/profile/info')}>
              <ProfileIcon fill={white} />
            </WrapIcon>
          </WrapPanel>
        </WrapHeader>
      </Wrap>

      <ModalUnauth isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    </>
  )
}

const Wrap = styled.header`
  background-color: ${({ theme }) => theme.grey[3]};
  padding: 0 30px;
`

const WrapHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
  height: 90px;
`

const WrapPanel = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`

const WrapIcon = styled.div`
  cursor: pointer;
`

const WrapBasket = styled.div`
  background-color: ${({ theme }) => theme.red[1]};
  width: 40px;
  padding: 5px;
  border-radius: 5px;
  position: relative;
`

const WrapCount = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-radius: 50%;
  position: relative;
  min-height: 25px;
  min-width: 25px;
  position: absolute;
  top: -10px;
  right: -10px;
`

const CountBasket = styled.p`
  color: ${({ theme }) => theme.black};
  font-family: ${({ theme }) => theme.roboto400};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
