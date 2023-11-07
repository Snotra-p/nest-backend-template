import { SERVER_ERROR_CODE } from '@libs/common/src/error/server-error-code';

export class ServerError {
  private readonly code: SERVER_ERROR_CODE;
  private readonly message: string;
  private readonly data: unknown;
  constructor(code: SERVER_ERROR_CODE, message: string, data?: unknown) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
