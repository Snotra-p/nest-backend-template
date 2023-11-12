import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@libs/common/src/module/auth/decorator/public.decorator';
import { AuthService } from '@libs/common/src/module/auth/auth.service';
import { Observable } from 'rxjs';
import { AUTH_STRATEGY } from '@libs/common/src/module/auth/constants/auth.constants.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AUTH_STRATEGY.JWT) {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
