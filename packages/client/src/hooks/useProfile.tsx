import { useQuery } from '@tanstack/react-query'

import { UsersService } from 'src/api'

export const useProfile = () => {
  const { data } = useQuery(['get-profile'], () => UsersService.getProfile(), {
    select: ({ data }) => data,
  })

  return { profile: data }
}
