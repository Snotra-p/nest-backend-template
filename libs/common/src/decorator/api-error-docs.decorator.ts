import { ApiResponse } from '@nestjs/swagger';
import {
  ServerErrorKey,
  ServerErrors,
} from '@libs/common/src/error/server-error-code';
import { applyDecorators } from '@nestjs/common';
import { ErrorBody } from '@libs/common/src/response/error-body';

export const ApiErrorDocs = (errorKeys: ServerErrorKey[]): MethodDecorator => {
  return applyDecorators(
    ...errorKeys.map((errorKey) =>
      ApiResponse({
        status: ServerErrors[errorKey].httpStatus,
        description:
          'code : ' +
          ServerErrors[errorKey].code +
          ' message : ' +
          ServerErrors[errorKey].message,
        type: ErrorBody,
      }),
    ),
  );
};
