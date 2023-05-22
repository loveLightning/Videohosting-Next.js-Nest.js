import { ApiMethods } from '../enums'
import { IRating, IReview, IReviewDto } from '../types'
import { BaseService } from './base'

export class ReviewsService extends BaseService {
  public static async getAll() {
    return await this.fetch<IReview[]>({
      method: 'GET',
      url: ApiMethods.Reviews,
    })
  }

  public static async getAverageById(id: string | number) {
    return await this.fetch<IRating>({
      method: 'GET',
      url: `${ApiMethods.Reviews}/average`,
      params: {
        data: id,
      },
    })
  }

  public static async leaveReview(productId: number, data: IReviewDto) {
    return await this.fetch<IReview>({
      method: 'POST',
      url: `${ApiMethods.Reviews}/leave/${productId}`,
      data,
    })
  }
}
