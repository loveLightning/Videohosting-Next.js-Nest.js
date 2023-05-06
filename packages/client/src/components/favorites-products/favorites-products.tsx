import { useQuery } from '@tanstack/react-query'

import { UsersService } from 'src/api'

export const FavoritesProducts = () => {
  const { data } = useQuery(['get profile'], () => UsersService.getProfile())

  return <></>
}
