import { ContentProfile } from 'src/components'
import { withAuthProtected } from 'src/hoc'

const ProfilePage = () => {
  return <ContentProfile />
}

export default withAuthProtected(ProfilePage)
