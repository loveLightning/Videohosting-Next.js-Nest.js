import { IsNumber, IsString } from 'class-validator'

export class CreateProductDto {
  @IsString()
  public readonly name: string

  @IsString()
  public readonly desc: string

  @IsNumber()
  public readonly price: number

  @IsString()
  public readonly category: string
}
