import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // constructor(private readonly jwtService: JwtService) {}
  //
  // async validateUser(
  //   username: string,
  //   password: string,
  // ): Promise<AuthLoginOutDto> {
  //   const accessPayload = {
  //     id: 1,
  //     type: TokenType.ACCESS,
  //     role: RoleType.USER,
  //   } as AuthPayload;
  //
  //   const refreshPayload = {
  //     id: 1,
  //     type: TokenType.REFRESH,
  //     role: RoleType.USER,
  //   } as AuthPayload;
  //
  //   const [accessToken, refreshToken] = await Promise.all([
  //     this.jwtService.signAsync(accessPayload, {
  //       expiresIn: JWT_ACCESS_EXPIRES_IN,
  //     }),
  //     this.jwtService.signAsync(refreshPayload, {
  //       expiresIn: JWT_REFRESH_EXPIRES_IN,
  //     }),
  //   ]);
  //
  //   return AuthLoginOutDto.of({ accessToken, refreshToken });
  // }
}
