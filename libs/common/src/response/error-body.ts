import { ApiProperty } from '@nestjs/swagger';

export class ErrorBody {
  @ApiProperty() code: number;
  @ApiProperty() timestamp: string;
  @ApiProperty() path: string;
  @ApiProperty() message: string;
}
