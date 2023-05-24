import { ApiMethods, convertPrice, UsersService } from '@amazon/common/src'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { GET_IMAGE_URL } from 'src/constants'
import { useAppSelector, userSelector } from 'src/store'
import { IProduct, RootCart } from 'src/types'

import { AddToCartButton } from './add-to-cart-button'
import { FavoriteButton } from './favorite-button'
import { ProductRating } from './product-rating'

interface Props {
  product: IProduct
  favorites?: IProduct[] | undefined
  cart?: RootCart | undefined
}

export const ProductItem = ({ product, favorites, cart }: Props) => {
  const queryClient = useQueryClient()
  const { push } = useRouter()

  const {
    user: { user },
  } = useAppSelector(userSelector)

  const { mutate } = useMutation(
    (productId: number) => UsersService.toggleFavorites(productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['get profile from catalog'])
        queryClient.invalidateQueries(['get profile'])
      },
    },
  )

  return (
    <Card onClick={() => push(`/product/${product.slug}`)}>
      {product.images[0].length && (
        <ImageCard
          src={GET_IMAGE_URL(
            ApiMethods.Products,
            'products',
            product.images[0],
          )}
          alt={product.name}
          width={0}
          height={0}
          priority
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
      )}

      <Title>{product.name}</Title>
      <Category>Category: {product.category?.name || 'Not found'}</Category>

      <ProductRating product={product} />

      <WrapButton>
        <Price>{convertPrice(product.price)}</Price>

        <AddToCartButton product={product} cart={cart} />
      </WrapButton>

      {user?.isActivated && (
        <WrapFavorites
          onClick={(e) => {
            e.stopPropagation()
            mutate(product.id)
          }}>
          <FavoriteButton productId={product.id} favorites={favorites} />
        </WrapFavorites>
      )}
    </Card>
  )
}

const Title = styled.h3`
  font-family: ${({ theme }) => theme.roboto500};
  margin: 10px 0;
  font-size: 24px;
`

const Category = styled.p`
  font-family: ${({ theme }) => theme.roboto400};
  margin-bottom: 10px;
  font-size: 18px;
`

const Card = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 5px;
  min-height: 100%;
  position: relative;
`

const Price = styled.p`
  font-family: ${({ theme }) => theme.roboto500};
  font-size: 20px;
  margin: 10px 0;
`

const ImageCard = styled(Image)`
  width: 100%;
  height: 100%;
  user-select: none;
`

const WrapButton = styled.div`
  margin-top: auto;
`

const WrapFavorites = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`
