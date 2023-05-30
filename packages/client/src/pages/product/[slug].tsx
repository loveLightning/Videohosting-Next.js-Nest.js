import { Container, ProductCard } from 'src/components'
import { withAuthPublic } from 'src/hoc'

const ProductPage = () => {
  return (
    <Container>
      <ProductCard />
    </Container>
  )
}

export default withAuthPublic(ProductPage)
