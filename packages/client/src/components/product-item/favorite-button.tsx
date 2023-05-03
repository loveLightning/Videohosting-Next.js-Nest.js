import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTheme } from 'styled-components'

import { UsersService } from 'src/api'
import { FavoritesIcon } from 'src/icons'
// import { useProfile } from 'src/hooks'

export const FavoriteButton: React.FC<{ productId: number }> = ({
  productId,
}) => {
  const { white } = useTheme()
  // const { profile } = useProfile()

  const { invalidateQueries } = useQueryClient()

  const { mutate } = useMutation(
    ['toggle favorite'],
    () => UsersService.toggleFavorites(productId),
    {
      onSuccess() {
        invalidateQueries(['get profile'])
      },
    },
  )

  // const isExists = profile?.favorites.some((el) => el.id === productId)

  return (
    <div>
      <FavoritesIcon width={20} height={20} />
      {/* <Button
        color="favorites"
        style={{ width: '100%', color: white }}
        onClick={() => mutate()}> */}
      {/* {isExists ? 'Remove from favorites' : 'Add to favorites'} */}
      {/* </Button> */}
    </div>
  )
}
