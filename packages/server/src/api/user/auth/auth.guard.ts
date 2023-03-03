import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard, IAuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { User } from '../user.entity'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  public handleRequest<TUser = any>(err: any, user: User): any {
    return user
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context)
    const { user } = context.switchToHttp().getRequest()

    return user ? true : false
  }
}
