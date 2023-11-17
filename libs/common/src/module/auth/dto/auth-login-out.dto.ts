import { ApiProperty } from '@nestjs/swagger';
import { BaseOutDto } from '@libs/common/src/base/base-out.dto';

export class AuthLoginOutDto extends BaseOutDto {
  @ApiProperty() accessToken: string;
}
