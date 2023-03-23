import { ApiMethods } from 'src/types'
import { BaseService } from '../base'
import { IReview, IReviewDto } from './res-types'

export class ReviewsService extends BaseService {
  public static async getAll() {
    return await this.fetch<IReview[]>({
      method: 'GET',
      url: ApiMethods.Reviews,
    })
  }

  public static async getAverage(id: string) {
    return await this.fetch<IReview>({
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
