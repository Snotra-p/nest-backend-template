import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ServerErrorCode,
  ServerErrorCodeMessage,
} from '@libs/common/src/error/server-error-code';
import { ServerError } from '@libs/common/src/error/server-error';
import { HttpStatus } from '@nestjs/common';

enum ResultType {
  OK,
  ERROR,
}

export class ApiResponse<S> {
  @ApiProperty() private readonly result: ResultType;
  @ApiPropertyOptional() private readonly code?: number;
  @ApiPropertyOptional() private readonly data?: S;

  private readonly error?: ServerError;

  constructor(
    result: ResultType,
    code?: HttpStatus,
    data?: S,
    error?: ServerError,
  ) {
    this.result = result;
    this.code = code;
    this.data = data;
    this.error = error;
  }

  static ok<T>(data?: T): ApiResponse<T> {
    return new ApiResponse<T>(ResultType.OK, HttpStatus.OK, data ?? null);
  }

  static error(errorCode: ServerErrorCode): ApiResponse<null> {
    const errorMessage =
      ServerErrorCodeMessage[errorCode] ??
      Object.keys(ServerErrorCode).find(
        (key) => ServerErrorCode[key] === errorCode,
      );

    return new ApiResponse<null>(
      ResultType.ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
      null,
      new ServerError(errorCode, errorMessage),
    );
  }
}
