import {
  ApiMethods,
  convertPrice,
  IProduct,
  ProductsService,
} from '@amazon/common/src'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { GET_IMAGE_URL } from 'src/utils'

interface Props {
  product: IProduct
}

export const ProductCard = ({ product }: Props) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  const { mutate } = useMutation((id: number) => ProductsService.delete(id), {
    onSuccess() {
      queryClient.invalidateQueries(['get all products'])
    },
  })

  const deleteByCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    mutate(product.id)
  }

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

      <WrapButton>
        <Price>{convertPrice(product.price)}</Price>
      </WrapButton>

      <WrapRemove onClick={(e) => deleteByCategory(e)}>
        <Remove>&times;</Remove>
      </WrapRemove>
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
  border-radius: 16px;
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

const WrapRemove = styled.div`
  background-color: ${({ theme }) => theme.grey[0]};
  min-width: 30px;
  min-height: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
`

const Remove = styled.div`
  display: flex;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.black};
  min-height: 26px;
`
