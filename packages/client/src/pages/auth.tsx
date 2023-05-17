import { Login, NextHead, Register } from 'src/components'
import { withAuth } from 'src/hoc'
import { useAppSelector, userSelector } from 'src/store'
import { AuthModeEnum } from 'src/types'

function AuthPage() {
  const { authMode } = useAppSelector(userSelector)

  return (
    <>
      <NextHead
        title={authMode === AuthModeEnum.SignIn ? 'Sign in' : 'Sign up'}
      />
      <>{authMode === AuthModeEnum.SignIn ? <Login /> : <Register />}</>
    </>
  )
}

export default withAuth(AuthPage)
