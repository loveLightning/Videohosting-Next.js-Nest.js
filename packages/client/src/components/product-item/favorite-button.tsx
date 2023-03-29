import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UsersService } from 'src/api'
import { useProfile } from 'src/hooks'

export const FavoriteButton: React.FC<{ productId: number }> = ({
  productId,
}) => {
  const { profile } = useProfile()

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

  const isExists = profile?.favorites.some((el) => el.id === productId)

  return (
    <div>
      <button onClick={() => mutate()}>
        {isExists ? 'Remove from basket' : 'Add to basket'}
      </button>
    </div>
  )
}
