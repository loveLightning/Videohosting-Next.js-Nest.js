import React from 'react'
import { CategoriesService, ICategory } from '@amazon/common/src'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Container } from './styled'

interface Props {
  category: ICategory
}

const Wrap = styled.div`
  position: relative;
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

const TextContainer = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: center;
`

const Name = styled.p`
  line-height: 19px;
  color: ${({ theme }) => theme.black};
  margin-right: 9px;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
`

export const CategoryCard = ({ category }: Props) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()

  const { mutate } = useMutation((id: number) => CategoriesService.delete(id), {
    onSuccess() {
      queryClient.invalidateQueries(['get all categories'])
    },
  })

  const deleteByCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    mutate(category.id)
  }

  return (
    <Wrap onClick={() => push(`/categories/edit/${category.id}`)}>
      <Container>
        <TextContainer>
          <Name>{category.name}</Name>
        </TextContainer>
      </Container>
      <WrapRemove onClick={(e) => deleteByCategory(e)}>
        <Remove>&times;</Remove>
      </WrapRemove>
    </Wrap>
  )
}
