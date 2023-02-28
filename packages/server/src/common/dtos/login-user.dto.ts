import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  public email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  public password: string
}
