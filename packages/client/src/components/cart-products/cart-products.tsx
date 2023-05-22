import React from 'react'
import {
  ApiMethods,
  CartService,
  convertPrice,
  OrdersService,
} from '@amazon/common/src'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Button } from 'src/components'
import { GET_IMAGE_URL } from 'src/constants'
import { useAppSelector, userSelector } from 'src/store'
import { RemoveCart, UpdateCart } from 'src/types'

export const CartProducts = () => {
  const queryClient = useQueryClient()

  const {
    user: { user },
  } = useAppSelector(userSelector)

  const { push } = useRouter()

  const { data: cart } = useQuery(
    ['get cart from basket'],
    () => CartService.getCart(),
    {
      select: ({ data }) => data,
      enabled: !!user?.isActivated,
    },
  )

  const sumOfPrice = cart?.cartItems?.reduce((acc, cur) => {
    return acc + cur.product.price * cur.quantity
  }, 0)

  const itemsCart = cart?.cartItems?.map((el) => ({
    price: el.product.price,
    quantity: el.quantity,
    productId: el.productId,
  }))

  const mutateOrderAndPayment = useMutation(
    ['create order and payment'],
    () => OrdersService.placeOrder({ items: itemsCart || [] }),
    {
      onSuccess({ data }) {
        // eslint-disable-next-line promise/catch-or-return, promise/prefer-await-to-then
        push(data.confirmation.confirmation_url)
      },
    },
  )

  const mutateRemoveFromCart = useMutation(
    ({ cartId, productId }: RemoveCart) =>
      CartService.removeProduct(cartId, productId),
    {
      onSuccess() {
        queryClient.invalidateQueries(['get cart from basket'])
      },
    },
  )

  const mutateUpdateCart = useMutation(
    ({ cartId, productId, quantity }: UpdateCart) =>
      CartService.updateQuantity(cartId, productId, quantity),
    {
      onSuccess() {
        queryClient.invalidateQueries(['get cart from basket'])
      },
    },
  )

  const mutateResetCart = useMutation(
    (cartId: number) => CartService.deleteCart(cartId),
    {
      onSuccess() {
        queryClient.invalidateQueries(['get cart from basket'])
      },
    },
  )

  return (
    <CartContainer>
      <CartTitle>Your Cart</CartTitle>
      <CartItemsContainer>
        {cart?.cartItems?.length ? (
          cart?.cartItems.map((item) => (
            <CartItem key={item.id}>
              <CartItemImage
                priority
                src={GET_IMAGE_URL(
                  ApiMethods.Products,
                  'products',
                  item.product.images[0],
                )}
                alt={item.product.name}
                height={150}
                width={150}
              />
              <CartItemName>{item.product.name}</CartItemName>

              <CartItemPrice>
                {convertPrice(item.product.price * item.quantity)}
              </CartItemPrice>

              <CartItemQuantity>
                <CartItemQuantityButton
                  onClick={() =>
                    item.quantity > 1 &&
                    mutateUpdateCart.mutate({
                      cartId: cart.id,
                      quantity: item.quantity - 1,
                      productId: item.productId,
                    })
                  }>
                  -
                </CartItemQuantityButton>

                <CartItemQuantityValue>{item.quantity}</CartItemQuantityValue>

                <CartItemQuantityButton
                  onClick={() =>
                    mutateUpdateCart.mutate({
                      cartId: cart.id,
                      quantity: item.quantity + 1,
                      productId: item.productId,
                    })
                  }>
                  +
                </CartItemQuantityButton>
              </CartItemQuantity>
              <button
                onClick={() =>
                  mutateRemoveFromCart.mutate({
                    cartId: cart.id,
                    productId: item.productId,
                  })
                }>
                Remove
              </button>
            </CartItem>
          ))
        ) : (
          <p>Add goods a cart</p>
        )}
      </CartItemsContainer>

      <Wrap>
        {cart?.cartItems?.length ? (
          <>
            <CartTotalContainer>
              <CartTotalLabel>Total:</CartTotalLabel>
              <CartTotalPrice>{sumOfPrice}</CartTotalPrice>
            </CartTotalContainer>
            <Button
              color="cart"
              onClick={() => mutateResetCart.mutate(cart.id)}>
              Reset cart
            </Button>
            <Button onClick={() => mutateOrderAndPayment.mutate()}>
              Place order
            </Button>
          </>
        ) : null}

        <Link href="/">Back to home</Link>
      </Wrap>
    </CartContainer>
  )
}

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const CartTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  background-color: ${({ theme }) => theme.grey[1]};
`

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`

const CartItemImage = styled(Image)``

const CartItemName = styled.span`
  font-size: 18px;
`

const CartItemPrice = styled.span`
  font-size: 18px;
  font-weight: bold;
`

const CartItemQuantity = styled.div`
  display: flex;
  align-items: center;
`

const CartItemQuantityButton = styled.button`
  font-size: 18px;
  font-weight: bold;
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: #ccc;
  cursor: pointer;
`

const CartItemQuantityValue = styled.span`
  font-size: 18px;
  font-weight: bold;
`

const CartTotalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
`

const CartTotalLabel = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin-right: 10px;
`

const CartTotalPrice = styled.span`
  font-size: 24px;
  font-weight: bold;
`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
