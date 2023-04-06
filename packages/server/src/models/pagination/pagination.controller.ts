import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtGuard } from '../auth/jwt.guard'
import { PaginationDto } from './pagination.dto'
import { PaginationService } from './pagination.service'

@Controller('pagination')
export class PaginationController {
  constructor(private readonly paginationService: PaginationService) {}

  @Get('')
  @UseGuards(JwtGuard)
  async getPagination(paginationDto: PaginationDto, defaultPerPage?: number) {
    return this.paginationService.getPagination(paginationDto, defaultPerPage)
  }
}
