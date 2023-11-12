import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginOutDto {
  @ApiProperty() accessToken: string;
  @ApiProperty() refreshToken: string;

  static of(
    params: Pick<AuthLoginOutDto, keyof AuthLoginOutDto>,
  ): AuthLoginOutDto {
    return Object.assign(new AuthLoginOutDto(), params);
  }
}
