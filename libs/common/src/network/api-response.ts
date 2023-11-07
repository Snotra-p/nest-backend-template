import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  SERVER_ERROR_CODE,
  SERVER_ERROR_CODE_MESSAGE,
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
  @ApiPropertyOptional() private readonly error?: ServerError;
  @ApiPropertyOptional() private readonly data?: S;

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

  static error(errorCode: SERVER_ERROR_CODE): ApiResponse<null> {
    const errorMessage =
      SERVER_ERROR_CODE_MESSAGE[errorCode] ??
      Object.keys(SERVER_ERROR_CODE).find(
        (key) => SERVER_ERROR_CODE[key] === errorCode,
      );

    return new ApiResponse<null>(
      ResultType.ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
      null,
      new ServerError(errorCode, errorMessage),
    );
  }
}
