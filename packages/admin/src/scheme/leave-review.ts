import * as yup from 'yup'

export const leaveReviewSchema = yup.object({
  reviewText: yup.string().required('You need to write any text'),
  rating: yup.number(),
})
