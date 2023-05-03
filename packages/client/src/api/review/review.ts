import { ApiMethods, IRating, IReview, IReviewDto } from 'src/types'

import { BaseService } from '../base'

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

  public static async leaveReview(id: string, data: IReviewDto) {
    return await this.fetch<IReview>({
      method: 'GET',
      url: `${ApiMethods.Reviews}/${id}`,
      data,
    })
  }
}
