import { CartProducts, NextHead } from 'src/components'
import { withAuth } from 'src/hoc'

const Cart = () => {
  return (
    <>
      <NextHead title="Cart" />
      <CartProducts />
    </>
  )
}

export default withAuth(Cart)
