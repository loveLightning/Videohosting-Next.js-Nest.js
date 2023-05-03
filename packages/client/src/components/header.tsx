import { useState } from 'react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Modal, SearchInput } from 'src/components'
import { BasketIcon, FavoritesIcon, LogoIcon } from 'src/icons'
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

  const [isShowModal, setIsShowModal] = useState(false)

  const checkRedirect = async () => {
    if (Cookies.get('accessToken')) {
      try {
        await dispatch(fetchCheckAuth())
        push('/favorutes')
      } catch (error) {
        setIsShowModal(true)
      }
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
            <WrapFavorites onClick={checkRedirect}>
              <FavoritesIcon active={true} />
            </WrapFavorites>

            <Link href="/cart">
              <WrapBasket>
                <WrapCount>
                  <CountBasket>{items.length}</CountBasket>
                </WrapCount>
                <BasketIcon />
              </WrapBasket>
            </Link>
            {/* <HeaderCart />
              <HeaderProfile /> */}
          </WrapPanel>
        </WrapHeader>
      </Wrap>

      {isShowModal && (
        <Modal
          title="Вo you want to log in"
          onClose={() => setIsShowModal(false)}
          isShow={isShowModal}
          style={{ width: 400, height: 200 }}>
          <Link href="/auth"></Link>
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

const WrapFavorites = styled.div`
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
