import styled, { useTheme } from 'styled-components'

import { Button } from 'src/components'
import {
  addToCart,
  cartSelector,
  removeFromCart,
  useAppDispatch,
  useAppSelector,
} from 'src/store'
import { IProduct } from 'src/types'

interface Props {
  product: IProduct
}

export const AddToCartButton = ({ product }: Props) => {
  const { white } = useTheme()

  const { items } = useAppSelector(cartSelector)
  const currentElement = items.find((el) => el.product.id === product.id)

  const dispatch = useAppDispatch()

  const editCartProducts = () => {
    if (currentElement) {
      dispatch(removeFromCart({ id: currentElement.product.id }))
    } else {
      dispatch(addToCart({ product }))
    }
  }

  return (
    <div>
      <Button
        color="cart"
        style={{ width: '100%', color: white }}
        onClick={editCartProducts}>
        <TextCart>
          {currentElement ? 'Remove from basket' : 'Add to basket'}
        </TextCart>
      </Button>
    </div>
  )
}

const TextCart = styled.p`
  font-family: ${({ theme }) => theme.roboto500};
  color: ${({ theme }) => theme.red[0]};
`
