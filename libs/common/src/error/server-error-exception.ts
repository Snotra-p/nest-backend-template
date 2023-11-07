import {
  SERVER_ERROR_CODE,
  SERVER_ERROR_CODE_MESSAGE,
} from '@libs/common/src/error/server-error-code';
import { InternalServerErrorException } from '@nestjs/common';

export class ServerErrorException extends InternalServerErrorException {
  constructor(public code: SERVER_ERROR_CODE) {
    super();
    this.code = code;
    this.message = SERVER_ERROR_CODE_MESSAGE[code];
  }
}
