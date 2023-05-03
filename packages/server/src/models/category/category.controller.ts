import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { JwtGuard } from '../auth/jwt.guard'
import { CategoryDto } from './category.dto'
import { CategoryService } from './category.service'

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Put(':id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id') categoryId: string,
    @Body() categoryDto: CategoryDto,
  ) {
    return this.categoryService.update(+categoryId, categoryDto)
  }

  @Post()
  @UseGuards(JwtGuard)
  async create() {
    return this.categoryService.create()
  }

  @Get()
  async getAll() {
    return this.categoryService.getAll()
  }

  @Get(':id')
  async findById(@Param('id') categoryId: string) {
    return this.categoryService.findById(+categoryId)
  }

  @Get('by-slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.categoryService.findBySlug(slug)
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async delete(@Param('id') categoryId: string) {
    return this.categoryService.delete(+categoryId)
  }
}
