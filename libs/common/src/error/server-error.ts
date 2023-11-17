import { ServerErrorCode } from '@libs/common/src/error/type/server-error.type';

export class ServerError {
  private readonly code: ServerErrorCode;
  private readonly message: string;
  private readonly data: unknown;
  constructor(code: ServerErrorCode, message: string, data?: unknown) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
