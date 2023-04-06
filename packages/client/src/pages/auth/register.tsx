import { NextHead, Register } from 'src/components'
import { withAuth } from 'src/hoc'

function RegisterPage() {
  return (
    <>
      <NextHead title="Sign up" />
      <Register />
    </>
  )
}

export default withAuth(RegisterPage)
