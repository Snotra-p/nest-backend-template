import { HttpException } from '@nestjs/common';
import { ServerErrors } from '@libs/common/src/error/server-error-code';
import { ServerErrorKey } from '@libs/common/src/error/type/server-error.type';

export class ServerErrorException extends HttpException {
  readonly customErrorCode: number;
  constructor(errorKey: ServerErrorKey) {
    const error = ServerErrors[errorKey];
    super(error.message, error.httpStatus);
    this.customErrorCode = ServerErrors[errorKey].code;
  }
}
