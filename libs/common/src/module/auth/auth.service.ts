import { Injectable } from '@nestjs/common';
import { AuthLoginInDto } from '@libs/common/src/module/auth/dto/auth-login-in.dto';
import { SessionData } from '@libs/common/src/module/auth/type/session-data';

@Injectable()
export class AuthService {
  // private readonly jwtProvider: JwtProvider
  constructor() {}
  //
  async loginWithSession(authLoginInDto: AuthLoginInDto): Promise<SessionData> {
    const { email, password } = authLoginInDto;
    if (await this.validateUser(email, password)) {
      return { userId: 1 };
    }

    throw new Error('USER NOT FOUND');
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    return true;
  }
}
