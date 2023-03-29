import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { AuthService, StorageService } from 'src/api'

export const withAuth = (WrappedComponent: React.ComponentType) => {
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
  return (props: any) => {
    const router = useRouter()
    const [verified, setVerified] = useState(false)

    const verifyToken = async () => {
      const accessToken = StorageService.getAccessToken()

      if (!accessToken) {
        router.replace('/auth/login')
      } else {
        const { verify } = await AuthService.verifyToken(accessToken)

        if (verify) {
          setVerified(verify)
        } else {
          StorageService.removeFromStorage()
          router.replace('/auth/login')
        }
      }
    }

    useEffect(() => {
      verifyToken()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (verified) {
      return <WrappedComponent {...props} />
    } else {
      return null
    }
  }
}
