import { useState } from 'react'
import { CartService } from '@amazon/common/src'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import styled, { useTheme } from 'styled-components'

import { ModalUnauth } from 'src/components'
import { Button } from 'src/components'
import { useAppSelector, userSelector } from 'src/store'
import { IProduct, RemoveCart, RootCart } from 'src/types'

interface Props {
  product: IProduct
  cart: RootCart | undefined
}

export const AddToCartButton = ({ product, cart }: Props) => {
  const { white } = useTheme()
  const queryClient = useQueryClient()
  const [isShowModal, setIsShowModal] = useState(false)
  const {
    user: { user },
  } = useAppSelector(userSelector)

  const currentEl = cart?.cartItems?.find((el) => el.product.id === product.id)

  const mutationAddToCart = useMutation(
    (productId: number) => CartService.addProduct(productId),
    {
      onSuccess: () => queryClient.invalidateQueries(['get cart from catalog']),
    },
  )

  const mutationRemoveFromCart = useMutation(
    ({ cartId, productId }: RemoveCart) =>
      CartService.removeProduct(cartId, productId),
    {
      onSuccess: () => queryClient.invalidateQueries(['get cart from catalog']),
    },
  )

  const editCartProducts = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (!user?.isActivated) {
      setIsShowModal(true)

      return
    }

    if (currentEl && cart?.id) {
      mutationRemoveFromCart.mutate({
        cartId: cart.id,
        productId: product.id,
      })
    } else {
      mutationAddToCart.mutate(product.id)
    }
  }

  return (
    <div>
      <Button
        color="cart"
        style={{ width: '100%', color: white }}
        onClick={(e) => editCartProducts(e)}>
        <TextCart>
          {currentEl ? 'Remove from basket' : 'Add to basket'}
        </TextCart>
      </Button>

      <ModalUnauth isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    </div>
  )
}

const TextCart = styled.p`
  font-family: ${({ theme }) => theme.roboto500};
  color: ${({ theme }) => theme.red[0]};
`
