import { ApiMethods } from 'src/types'
import { BaseService } from '../base'
import { ICategory } from './res-types'

export class CategoriesService extends BaseService {
  public static async getAll() {
    return await this.fetch<ICategory[]>({
      method: 'GET',
      url: ApiMethods.Categories,
    })
  }

  public static async getById(id: string) {
    return await this.fetch<ICategory>({
      method: 'GET',
      url: `${ApiMethods.Categories}/${id}`,
    })
  }

  public static async getBySlug(slug: string) {
    return await this.fetch<ICategory>({
      method: 'GET',
      url: `${ApiMethods.BySlugCategory}/${slug}`,
    })
  }

  public static async create() {
    return await this.fetch<ICategory>({
      method: 'Post',
      url: ApiMethods.Categories,
    })
  }

  public static async delete(id: string) {
    return await this.fetch<ICategory>({
      method: 'DELETE',
      url: `${ApiMethods.Categories}/${id}`,
    })
  }

  public static async update(id: string, name: string) {
    return await this.fetch<ICategory>({
      method: 'PUT',
      url: `${ApiMethods.Categories}/${id}`,
      data: { name },
    })
  }
}
