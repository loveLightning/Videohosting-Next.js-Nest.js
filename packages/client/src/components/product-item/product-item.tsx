import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import styled from 'styled-components'

import { UsersService } from 'src/api'
import { IProduct } from 'src/types'
import { convertPrice } from 'src/utils'

import { AddToCartButton } from './add-to-cart-button'
import { FavoriteButton } from './favorite-button'
import { ProductRating } from './product-rating'

interface Props {
  product: IProduct
  favorites: IProduct[] | undefined
}

export const ProductItem = ({ product, favorites }: Props) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (productId: number) => UsersService.toggleFavorites(productId),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['get profile from catalog']),
    },
  )

  const chooseAsFavorite = () => {
    mutate(product.id)
  }

  return (
    <Card>
      {product.images[0].length && (
        <ImageCard
          src={product.images[0]}
          alt={product.name}
          width={0}
          height={0}
          priority
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
      )}

      <Title>{product.name}</Title>
      <Category>Category: {product.category?.name}</Category>

      <ProductRating product={product} />

      <WrapButton>
        <Price>{convertPrice(product.price)}</Price>

        <AddToCartButton product={product} />
      </WrapButton>

      <WrapFavorites onClick={chooseAsFavorite}>
        <FavoriteButton productId={product.id} favorites={favorites} />
      </WrapFavorites>
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
