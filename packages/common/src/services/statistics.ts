import { ApiMethods } from '../enums'
import { IStatistics } from '../types'
import { BaseService } from './base'

export class StatisticsService extends BaseService {
  public static async getMain() {
    return await this.fetch<IStatistics[]>({
      method: 'GET',
      url: ApiMethods.Statistics,
    })
  }
}
