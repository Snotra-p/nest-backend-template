import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginInDto {
  @ApiProperty() email!: string;
  @ApiProperty() password!: string;
}
