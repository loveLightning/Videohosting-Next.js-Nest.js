import {
  addToCart,
  cartSelector,
  removeFromCart,
  useAppDispatch,
} from 'src/store'
import { useAppSelector } from 'src/store'
import { IProduct } from 'src/types'

interface Props {
  product: IProduct
}

export const AddToCartButton = ({ product }: Props) => {
  const { items } = useAppSelector(cartSelector)
  const currentElement = items.find((el) => el.product.id === product.id)

  const dispatch = useAppDispatch()

  return (
    <div>
      <button
        onClick={() =>
          currentElement
            ? dispatch(removeFromCart({ id: currentElement.id }))
            : dispatch(
              addToCart({ product, quantity: 1, price: product.price }),
            )
        }>
        {currentElement ? 'Remove from basket' : 'Add to basket'}
      </button>
    </div>
  )
}
