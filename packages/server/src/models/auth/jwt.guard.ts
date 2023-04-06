import { Injectable, ExecutionContext, ConsoleLogger } from '@nestjs/common'
import { AuthGuard, IAuthGuard } from '@nestjs/passport'
import { User } from '@prisma/client'
import { Request } from 'express'

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements IAuthGuard {
  public handleRequest(err: unknown, user: User): any {
    return user
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context)

    const { user }: Request = context.switchToHttp().getRequest()

    return user ? true : false
  }
}
