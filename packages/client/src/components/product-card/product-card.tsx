import { Rating } from 'react-simple-star-rating'
import { ProductsService, ReviewsService } from '@amazon/common/src'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Form, Formik, FormikHelpers } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Button } from 'src/components'
import { PROFILE_IMAGE_URL } from 'src/constants'
import { leaveReviewSchema } from 'src/scheme'
import { useAppSelector, userSelector } from 'src/store'
import { IReviewDto } from 'src/types'

interface LeaveReviewTypes {
  productId: number
  data: IReviewDto
}

interface InitialValuesTypes {
  reviewText: string
  rating: number | null
}

const initialValues: InitialValuesTypes = {
  reviewText: '',
  rating: null,
}

export const ProductCard = () => {
  const {
    back,
    query: { slug },
  } = useRouter()

  const queryClient = useQueryClient()
  const {
    user: { user },
  } = useAppSelector(userSelector)

  const { data: product } = useQuery(
    ['get product'],
    () => ProductsService.getBySlug(slug as string),
    {
      select: ({ data }) => data,
      enabled: !!slug,
    },
  )

  const { mutate, isLoading } = useMutation(
    ({ productId, data }: LeaveReviewTypes) =>
      ReviewsService.leaveReview(productId, data),
    {
      onSuccess: () => queryClient.invalidateQueries(['get product']),
    },
  )

  const onSubmit = async (
    values: InitialValuesTypes,
    formikHelpres: FormikHelpers<InitialValuesTypes>,
  ) => {
    try {
      if (values.rating && product) {
        const data = {
          rating: values.rating,
          text: values.reviewText,
        }

        mutate({ productId: product.id, data })
        formikHelpres.resetForm()
      }
      // eslint-disable-next-line prettier/prettier
    } catch (error) { }
  }

  return (
    <Card>
      <GoBack onClick={() => back()}>Go back</GoBack>
      {product && (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              marginBottom: 20,
            }}>
            <Image
              src={product.images[0]}
              alt="product"
              height={500}
              width={500}
            />
            <Title>Name: {product.name}</Title>
            <Desc>Description: {product.description}</Desc>
            <Item>Category: {product.category.name}</Item>
            <Item>Price: {product.price}</Item>
          </div>

          {user?.isActivated && (
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={leaveReviewSchema}>
              {(formik) => {
                return (
                  <Form style={{ maxWidth: 300 }}>
                    <label htmlFor="reviewText">Message text</label>
                    <TextArea
                      rows={10}
                      cols={100}
                      value={formik.values.reviewText}
                      name="reviewText"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}></TextArea>

                    <Rating
                      onClick={(rate: number) =>
                        formik.setFieldValue('rating', rate)
                      }
                      initialValue={formik.values.rating as number}
                    />
                    {formik.values.rating}

                    <Button
                      type="submit"
                      disabled={!(formik.dirty && formik.isValid)}
                      style={{ width: '100%', marginTop: 30 }}
                      isLoading={isLoading}>
                      Send
                    </Button>
                  </Form>
                )
              }}
            </Formik>
          )}

          <Item>Reviews</Item>
          {product.reviews?.length ? (
            product.reviews?.map((review) => (
              <ReviewCard key={review.id}>
                <div>
                  {review.user.avatarPath && (
                    <Image
                      src={PROFILE_IMAGE_URL(review.user.avatarPath)}
                      alt="avatar"
                      height={50}
                      width={50}
                    />
                  )}
                  <Item>{review.user.name}</Item>
                </div>

                <div>
                  <Rating
                    readonly
                    initialValue={review.rating}
                    size={23}
                    transition
                    allowFraction={true}
                  />

                  <Item>{review.text}</Item>
                </div>
              </ReviewCard>
            ))
          ) : (
            <p>Reviews not found</p>
          )}
        </>
      )}
    </Card>
  )
}

const Card = styled.div`
  margin-bottom: 30px;
`

const GoBack = styled.p`
  color: ${({ theme }) => theme.blue[0]};
  cursor: pointer;
`

const Title = styled.h3`
  font-size: 30px;
  font-family: ${({ theme }) => theme.roboto700};
`

const Desc = styled.h3`
  font-size: 20px;
  font-family: ${({ theme }) => theme.roboto300};
`

const Item = styled.h3`
  font-size: 20px;
  font-family: ${({ theme }) => theme.roboto400};
`

const ReviewCard = styled.div`
  display: flex;
`

const TextArea = styled.textarea`
  padding: 15px;
  font-size: 20px;
  font-family: ${({ theme }) => theme.roboto400};
  resize: none;
`
