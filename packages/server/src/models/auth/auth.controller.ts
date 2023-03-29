import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto, LoginDto } from './dtos/auth.dto'
import { AccessTokenDto, RefreshTokenDto } from './dtos/token.dto'
import { JwtAuthGuard } from './jwt-auth.guard'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() userDto: LoginDto) {
    return this.authService.login(userDto)
  }

  // @HttpCode(200)
  @Post('register')
  async register(@Body() userDto: RegisterDto) {
    return this.authService.register(userDto)
  }

  // @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('access-token')
  async getNewTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.getNewTokens(refreshTokenDto.refreshToken)
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify-token')
  async verifyToken(@Body() accessTokenDto: AccessTokenDto) {
    return this.authService.verifyToken(accessTokenDto.accessToken)
  }
}
