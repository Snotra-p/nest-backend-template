import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ServerErrorCode,
  ServerErrors,
} from '@libs/common/src/error/server-error-code';
import { ServerError } from '@libs/common/src/error/server-error';

const ResultType = {
  OK: 'OK',
  ERROR: 'ERROR',
} as const;

type ResultType = (typeof ResultType)[keyof typeof ResultType];

export class ResponseEntity<S> {
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

  static ok<T>(data?: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResultType.OK, 0, data ?? undefined);
  }

  static error(errorCode: ServerErrorCode): ResponseEntity<undefined> {
    return new ResponseEntity<undefined>(
      ResultType.ERROR,
      ServerErrors[errorCode].httpStatus,
      undefined,
      new ServerError(errorCode, ServerErrors[errorCode].message),
    );
  }
}
