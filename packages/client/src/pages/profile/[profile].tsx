import { ContentProfile } from 'src/components'
import { withAuth } from 'src/hoc'

const ProfilePage = () => {
  return <ContentProfile />
}

export default withAuth(ProfilePage)
