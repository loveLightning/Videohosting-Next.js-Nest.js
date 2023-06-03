import { useRouter } from 'next/router'

import { ContentProfile, NextHead } from 'src/components'
import { withAuthProtected } from 'src/hoc'

const ProfilePage = () => {
  const { query } = useRouter()

  return (
    <>
      {query?.profile && <NextHead title={`Profile ${query.profile}`} />}
      <ContentProfile />
    </>
  )
}

export default withAuthProtected(ProfilePage)
