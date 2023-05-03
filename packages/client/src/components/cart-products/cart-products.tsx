import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import {
  cartSelector,
  changeQuantity,
  removeFromCart,
  resetCart,
  useAppDispatch,
  useAppSelector,
} from 'src/store'
import { convertPrice } from 'src/utils'

export const CartProducts = () => {
  const { items } = useAppSelector(cartSelector)
  const dispatch = useAppDispatch()

  const sumOfPrice = items.reduce((acc, cur) => {
    return acc + cur.product.price * cur.quantity
  }, 0)

  return (
    <CartContainer>
      <CartTitle>Your Cart</CartTitle>
      <CartItemsContainer>
        {items.length ? (
          items.map((item) => (
            <CartItem key={item.product.id}>
              <CartItemImage
                src={item.product.images[0]}
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
                    dispatch(
                      changeQuantity({ id: item.product.id, type: 'munus' }),
                    )
                  }>
                  -
                </CartItemQuantityButton>
                <CartItemQuantityValue>{item.quantity}</CartItemQuantityValue>
                <CartItemQuantityButton
                  onClick={() =>
                    dispatch(
                      changeQuantity({ id: item.product.id, type: 'plus' }),
                    )
                  }>
                  +
                </CartItemQuantityButton>
              </CartItemQuantity>
              <button
                onClick={() =>
                  dispatch(removeFromCart({ id: item.product.id }))
                }>
                Remove
              </button>
            </CartItem>
          ))
        ) : (
          <p>Add goods a cart</p>
        )}
      </CartItemsContainer>

      <CartTotalContainer>
        <CartTotalLabel>Total:</CartTotalLabel>
        <CartTotalPrice>${sumOfPrice}</CartTotalPrice>
      </CartTotalContainer>
      {items.length ? (
        <button onClick={() => dispatch(resetCart())}>Reset cart</button>
      ) : null}

      <Link href="/">Back to home</Link>
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
