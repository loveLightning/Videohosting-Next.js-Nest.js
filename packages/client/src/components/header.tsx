import { useState } from 'react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled, { useTheme } from 'styled-components'

import { Button, Modal, SearchInput } from 'src/components'
import { BasketIcon, LogoIcon, ProfileIcon } from 'src/icons'
import {
  cartSelector,
  fetchCheckAuth,
  useAppDispatch,
  useAppSelector,
} from 'src/store'

export const Header = () => {
  const { items } = useAppSelector(cartSelector)
  const dispatch = useAppDispatch()
  const { push } = useRouter()
  const { white } = useTheme()

  const [isShowModal, setIsShowModal] = useState(false)

  const checkRedirect = async () => {
    if (Cookies.get('accessToken')) {
      try {
        await dispatch(fetchCheckAuth())
        push('/profile/info')

        return
      } catch (error) {
        setIsShowModal(true)
      }
    }
    setIsShowModal(true)
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

            <Link href="/cart">
              <WrapBasket>
                <WrapCount>
                  <CountBasket>{items.length}</CountBasket>
                </WrapCount>
                <BasketIcon />
              </WrapBasket>
            </Link>
            <WrapIcon onClick={checkRedirect}>
              <ProfileIcon fill={white} />
            </WrapIcon>
          </WrapPanel>
        </WrapHeader>
      </Wrap>

      {isShowModal && (
        <Modal
          title="Do you want to log in"
          onClose={() => setIsShowModal(false)}
          isShow={isShowModal}
          style={{ width: 400, height: 200 }}>
          <WrapModal>
            <Button onClick={() => push('/auth')}>Sign in</Button>

            <Button color="cart" onClick={() => setIsShowModal(false)}>
              Cancel
            </Button>
          </WrapModal>
        </Modal>
      )}
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

const WrapModal = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 30px;
`
