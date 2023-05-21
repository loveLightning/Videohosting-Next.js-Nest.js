import { ICategory } from '@amazon/common/src'
import Link from 'next/link'
import styled from 'styled-components'

import { CategoryCard } from './category-card'

interface Props {
  categories: ICategory[] | undefined
}

export const CategoriesCatalog = ({ categories }: Props) => {
  return (
    <Container>
      <MachineryList>
        <Link href={'/categories/add'}>
          <AddCategories>
            <AddWrapper>
              <AddText>Add</AddText>
            </AddWrapper>
          </AddCategories>
        </Link>

        {categories?.length ? (
          categories.map((category) => (
            <li key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))
        ) : (
          <div>Not found</div>
        )}
      </MachineryList>
    </Container>
  )
}

const Container = styled.section`
  margin-bottom: 40px;
`

const MachineryList = styled.ul`
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  gap: 20px;

  & > li {
    list-style: none;
  }
`

const AddCategories = styled.div`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 256px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.grey[0]};
  cursor: pointer;
`

const AddWrapper = styled.div`
  max-width: 100px;
  text-align: center;
`

const AddText = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.blue[0]};
  line-height: 24px;
`
