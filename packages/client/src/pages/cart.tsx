import { CartProducts, NextHead } from 'src/components'
import { withAuthProtected } from 'src/hoc'

const Cart = () => {
  return (
    <>
      <NextHead title="Cart" />
      <CartProducts />
    </>
  )
}

export default withAuthProtected(Cart)
