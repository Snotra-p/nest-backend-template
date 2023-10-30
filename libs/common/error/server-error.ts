import { SERVER_ERROR_EXCEPTION_DESC } from '../constants/server-error-exception-desc';

export class ServerError extends Error {
  public message: string;
  constructor(public code: number) {
    super();
    this.code = code;
    this.message = SERVER_ERROR_EXCEPTION_DESC[code];
  }
}
