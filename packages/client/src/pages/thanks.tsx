import Link from 'next/link'

import { withAuthPublic } from 'src/hoc'

const Thanks = () => {
  return (
    <>
      <div>thanks</div>
      <Link href="/">Go back</Link>
    </>
  )
}

export default withAuthPublic(Thanks)
