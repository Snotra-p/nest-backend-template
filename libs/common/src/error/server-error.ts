import { SERVER_ERROR_EXCEPTION_DESC } from '../constants/server-error-exception-desc';
import { InternalServerErrorException } from '@nestjs/common';

export class ServerError extends InternalServerErrorException {
  public message: string;
  constructor(public code: number) {
    super();
    this.code = code;
    this.message = SERVER_ERROR_EXCEPTION_DESC[code];
  }
}
