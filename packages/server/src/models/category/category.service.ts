import { Injectable, NotFoundException } from '@nestjs/common'
import { Category } from '@prisma/client'
import { titleToSlug } from 'src/common/utils/slug'
import { PrismaService } from 'src/services/prisma/prisma.service'
import { CategoryDto } from './category.dto'
import { returnCategoryObj } from './return-category.object'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async findById(categoryId: number) {
    const category = this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      select: returnCategoryObj,
    })

    if (!category) throw new NotFoundException('Category not found')

    return category
  }

  async findBySlug(slug: string) {
    const category = this.prisma.category.findUnique({
      where: {
        slug,
      },
      select: returnCategoryObj,
    })

    if (!category) throw new NotFoundException('Category not found')

    return category
  }

  async create() {
    return this.prisma.category.create({
      data: {
        name: 'Fruits',
        slug: 'Fruits',
      },
    })
  }

  async update(categoryId: number, categoryDto: CategoryDto) {
    const category = this.findById(categoryId)

    return this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: categoryDto.name,
        slug: titleToSlug(categoryDto.name),
      },
    })
  }

  async delete(categoryId: number) {
    return this.prisma.category.delete({
      where: {
        id: categoryId,
      },
    })
  }

  async getAll() {
    return this.prisma.category.findMany({
      select: returnCategoryObj,
    })
  }
}
