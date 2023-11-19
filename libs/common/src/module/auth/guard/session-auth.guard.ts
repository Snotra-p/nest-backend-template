import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@libs/common/src/module/auth/decorator/public.decorator';
import { AuthService } from '@libs/common/src/module/auth/auth.service';
import { Observable } from 'rxjs';
import { ContextProvider } from '@libs/common/src/context/context.provider';
import { SESSION_DATA_KEY } from '@libs/common/src/module/auth/constants/auth.constants';
import { Session } from 'fastify';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const session: Session = context.switchToHttp().getRequest().session;

    if (!session.data) throw new UnauthorizedException('SESSION NOT FOUND');

    ContextProvider.set(SESSION_DATA_KEY, session.data);

    return true;
  }
}
