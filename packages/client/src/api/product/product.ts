import { ApiMethods, IPaginationProduct } from 'src/types'

import { BaseService } from '../base'
import { IProduct, IProductSort, UpdateProductTypes } from './res-types'

export class ProductsService extends BaseService {
  public static async getAll(dataQuery: IProductSort) {
    return await this.fetch<IPaginationProduct>({
      method: 'GET',
      url: ApiMethods.Products,
      params: dataQuery,
    })
  }

  public static async getSimilar(id: string) {
    return await this.fetch<IProduct[]>({
      method: 'GET',
      url: `${ApiMethods.Products}/${id}`,
    })
  }

  public static async getBySlug(slug: string) {
    return await this.fetch<IProduct[]>({
      method: 'GET',
      url: `${ApiMethods.Products}/${slug}`,
    })
  }

  public static async getByCategory(categorySlug: string) {
    return await this.fetch<IProduct[]>({
      method: 'GET',
      url: `${ApiMethods.Products}/by-category/${categorySlug}`,
    })
  }

  public static async create() {
    return await this.fetch<IProduct[]>({
      method: 'POST',
      url: ApiMethods.Products,
    })
  }

  public static async update(id: string, data: UpdateProductTypes) {
    return await this.fetch<IProduct[]>({
      method: 'PUT',
      url: `${ApiMethods.Products}/${id}`,
      data,
    })
  }

  public static async delete(id: string) {
    return await this.fetch<IProduct[]>({
      method: 'DELETE',
      url: `${ApiMethods.Products}/${id}`,
    })
  }

  public static async getById(id: string) {
    return await this.fetch<IProduct[]>({
      method: 'GET',
      url: `${ApiMethods.Products}/${id}`,
    })
  }
}
