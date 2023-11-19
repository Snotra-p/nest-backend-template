import { HttpException } from '@nestjs/common';
import {
  ServerErrorKey,
  ServerErrors,
} from '@libs/common/src/error/server-error-code';

export class ServerErrorException extends HttpException {
  readonly customErrorCode: number;
  constructor(errorKey: ServerErrorKey) {
    const error = ServerErrors[errorKey];
    super(error.message, error.httpStatus);
    this.customErrorCode = ServerErrors[errorKey].code;
  }
}
