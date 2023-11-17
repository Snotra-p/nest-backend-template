import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ServerErrors } from '@libs/common/src/error/server-error-code';
import { ServerError } from '@libs/common/src/error/server-error';
import { ServerErrorCode } from '@libs/common/src/error/type/server-error.type';

const ResultType = {
  OK: 'OK',
  ERROR: 'ERROR',
} as const;

type ResultType = (typeof ResultType)[keyof typeof ResultType];

export class ApiResponse<S> {
  @ApiProperty() private readonly result: ResultType;
  @ApiPropertyOptional() private readonly code?: number;
  @ApiPropertyOptional() private readonly data?: S;

  private readonly error?: ServerError;

  constructor(
    result: ResultType,
    code?: number,
    data?: S,
    error?: ServerError,
  ) {
    this.result = result;
    this.code = code;
    this.data = data;
    this.error = error;
  }

  static ok<T>(data?: T): ApiResponse<T> {
    return new ApiResponse<T>(ResultType.OK, 0, data ?? null);
  }

  static error(errorCode: ServerErrorCode): ApiResponse<null> {
    return new ApiResponse<null>(
      ResultType.ERROR,
      ServerErrors[errorCode].httpStatus,
      null,
      new ServerError(errorCode, ServerErrors[errorCode].message),
    );
  }
}
