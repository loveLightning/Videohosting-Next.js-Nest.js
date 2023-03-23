import { ApiMethods } from 'src/types'
import { BaseService } from '../base'
import { IStatistics } from './res-types'

export class StatisticsService extends BaseService {
  public static async getMain() {
    return await this.fetch<IStatistics[]>({
      method: 'GET',
      url: ApiMethods.Statistics,
    })
  }
}
