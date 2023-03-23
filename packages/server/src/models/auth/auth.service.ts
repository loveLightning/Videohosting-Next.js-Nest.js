import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { verify } from 'argon2'
import { PrismaService } from 'src/services/prisma/prisma.service'
import { UsersService } from '../user/user.service'
import { LoginDto, RegisterDto } from './dtos/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findForEmail(email)

    if (!user) throw new NotFoundException('User not found')

    const isValid = verify(user.password, pass)

    if (!isValid) throw new UnauthorizedException('Invalid password')

    const { password, ...result } = user
    return result
  }

  async register(userDto: RegisterDto) {
    const user = await this.usersService.create(userDto)
    const tokens = await this.createTokens(user.id, user.email)

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }

  async login(userDto: LoginDto) {
    const { email } = userDto

    const user = await this.usersService.findForEmail(email)

    const tokens = await this.createTokens(user.id, user.email)

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwtService.verifyAsync(refreshToken)

    if (!result) throw new UnauthorizedException('Invalid refresh token')

    const user = await this.prisma.user.findUnique({
      where: {
        id: result.id,
      },
    })

    const tokens = await this.createTokens(user.id, user.email)

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }

  private async createTokens(userId: number, email: string) {
    const payload = { id: userId }

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    })

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    })

    return { accessToken, refreshToken }
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
    }
  }
}
