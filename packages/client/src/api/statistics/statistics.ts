import { ApiMethods } from 'src/types'
import { IStatistics } from 'src/types'

import { BaseService } from '../base'

export class StatisticsService extends BaseService {
  public static async getMain() {
    return await this.fetch<IStatistics[]>({
      method: 'GET',
      url: ApiMethods.Statistics,
    })
  }
}
