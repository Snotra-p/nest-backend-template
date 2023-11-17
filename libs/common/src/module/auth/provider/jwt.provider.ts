import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from '@libs/common/src/module/auth/type/auth-payload';

@Injectable()
export class JwtProvider {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(payload: AuthPayload, expiresIn: number): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: expiresIn,
    });
  }
}
