import { FriendIcon, MessageIcon, ProfileIcon } from 'src/icons'

interface IActive {
  isActive: boolean
}

interface Props {
  id: number
  href: string
  Icon: (isActive: IActive) => JSX.Element
}

export const NavbarData: Props[] = [
  {
    id: 0,
    href: '/profile',
    Icon: ProfileIcon,
  },
  {
    id: 1,
    href: '/message',
    Icon: MessageIcon,
  },
  {
    id: 2,
    href: '/friends',
    Icon: FriendIcon,
  },
]
