import { useRouter } from 'next/router'

import { Container, NextHead, ProductCard } from 'src/components'
import { withAuthPublic } from 'src/hoc'

const ProductPage = () => {
  const { query } = useRouter()

  return (
    <>
      {query?.slug && <NextHead title={query.slug as string} />}
      <Container>
        <ProductCard />
      </Container>
    </>
  )
}

export default withAuthPublic(ProductPage)
