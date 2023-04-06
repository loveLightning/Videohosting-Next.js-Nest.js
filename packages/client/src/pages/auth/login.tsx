import { Login, NextHead } from 'src/components'
import { withAuth } from 'src/hoc'

function LoginPage() {
  return (
    <>
      <NextHead title="Sign in" />
      <Login />
    </>
  )
}

export default withAuth(LoginPage)
