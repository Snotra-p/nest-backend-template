import { Injectable } from '@nestjs/common';
import { AuthLoginOutDto } from '@libs/common/src/module/auth/dto/auth-login-out.dto';
import { AuthLoginInDto } from '@libs/common/src/module/auth/dto/auth-login-in.dto';
import { ContextProvider } from '@libs/common/src/context/context.provider';

@Injectable()
export class AuthService {
  // private readonly jwtProvider: JwtProvider
  constructor() {}
  //
  async loginWithSession(
    authLoginInDto: AuthLoginInDto,
  ): Promise<AuthLoginOutDto> {
    const { email, password } = authLoginInDto;
    if (await this.validateUser(email, password)) {
      ContextProvider.setSessionData({ userId: 1 });
    }

    return;
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    return true;
  }
}
