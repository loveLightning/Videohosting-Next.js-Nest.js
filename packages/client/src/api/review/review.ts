import { ApiMethods, IReview, IReviewDto } from 'src/types'

import { BaseService } from '../base'

export class ReviewsService extends BaseService {
  public static async getAll() {
    return await this.fetch<IReview[]>({
      method: 'GET',
      url: ApiMethods.Reviews,
    })
  }

  public static async getAverageById(id: string | number) {
    return await this.fetch<number>({
      method: 'GET',
      url: `${ApiMethods.Reviews}/${id}`,
    })
  }

  public static async leaveReview(id: string, data: IReviewDto) {
    return await this.fetch<IReview>({
      method: 'GET',
      url: `${ApiMethods.Reviews}/${id}`,
      data,
    })
  }
}
