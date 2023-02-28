import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { RoleEnumTypes } from 'src/entity/user.entity'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  public password: string

  @IsEnum({ message: 'Should be a enum' })
  public user: RoleEnumTypes

  @IsString()
  public photo: string

  @IsBoolean()
  public verified: boolean
}
