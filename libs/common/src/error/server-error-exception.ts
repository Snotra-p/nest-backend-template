import {
  ServerErrorCode,
  ServerErrorCodeMessage,
} from '@libs/common/src/error/server-error-code';
import { InternalServerErrorException } from '@nestjs/common';

export class ServerErrorException extends InternalServerErrorException {
  constructor(public code: ServerErrorCode) {
    super();
    this.code = code;
    this.message = ServerErrorCodeMessage[code];
  }
}
