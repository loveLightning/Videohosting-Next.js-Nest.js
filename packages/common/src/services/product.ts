import { ApiMethods } from '../enums'
import {
  AddProductFormData,
  IPaginationProduct,
  IProduct,
  IProductSort,
} from '../types'
import { BaseService } from './base'

export class ProductsService extends BaseService {
  public static async getAll(dataQuery?: IProductSort) {
    const { data } = await this.fetch<IPaginationProduct>({
      method: 'GET',
      url: ApiMethods.Products,
      params: dataQuery,
    })

    return data
  }

  public static async getSimilar(id: string | number) {
    return await this.fetch<IProduct[]>({
      method: 'GET',
      url: `${ApiMethods.Products}/simular/${id}`,
    })
  }

  public static async getBySlug(slug: string) {
    return await this.fetch<IProduct>({
      method: 'GET',
      url: `${ApiMethods.Products}/by-slug/${slug}`,
    })
  }

  public static async getByCategory(categorySlug: string) {
    return await this.fetch<IProduct[]>({
      method: 'GET',
      url: `${ApiMethods.Products}/by-category/${categorySlug}`,
    })
  }

  public static async create(data: AddProductFormData) {
    return await this.fetch<IProduct[]>({
      method: 'POST',
      url: ApiMethods.Products,
      data,
    })
  }

  public static async update(id: string | number, data: AddProductFormData) {
    return await this.fetch<IProduct[]>({
      method: 'PUT',
      url: `${ApiMethods.Products}/${id}`,
      data,
    })
  }

  public static async delete(id: string | number) {
    return await this.fetch<IProduct[]>({
      method: 'DELETE',
      url: `${ApiMethods.Products}/${id}`,
    })
  }

  public static async getById(id: string | number) {
    return await this.fetch<IProduct>({
      method: 'GET',
      url: `${ApiMethods.Products}/${id}`,
    })
  }
}
