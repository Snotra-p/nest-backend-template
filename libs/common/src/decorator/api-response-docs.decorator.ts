import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';
import { ResponseEntity } from '@libs/common/src/response/response-entity';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ApiErrorDocs } from '@libs/common/src/decorator/api-error-docs.decorator';
import { ServerErrorKey } from '@libs/common/src/error/server-error-code';

type ApiResponseDocsOptions = {
  type?: Type;
  summary?: string;
  isArray?: boolean;
  errors?: ServerErrorKey[];
};

export const ApiResponseDocs = (
  options: ApiResponseDocsOptions,
): MethodDecorator => {
  const { type, summary, isArray, errors } = options ?? {};

  const decorators = [
    ApiOperation({ summary: summary }),
    ApiExtraModels(ResponseEntity),
  ];

  if (errors) {
    decorators.push(ApiErrorDocs(errors));
  }

  if (!type) {
    decorators.push(ApiOkResponse({ type: ApiResponse }));
    return applyDecorators(...decorators);
  }

  decorators.push(ApiExtraModels(type));

  const baseResponseSchema: ReferenceObject = {
    $ref: getSchemaPath(ResponseEntity),
  };

  const properties = isArray
    ? {
        data: { type: 'array', items: { $ref: getSchemaPath(type) } },
      }
    : { data: { $ref: getSchemaPath(type) } };

  const customTypeSchema: SchemaObject = { properties };

  const combineSchema: (ReferenceObject | SchemaObject)[] = [
    baseResponseSchema,
    customTypeSchema,
  ];

  decorators.push(
    ApiOkResponse({
      schema: {
        allOf: combineSchema,
      },
    }),
  );

  return applyDecorators(...decorators);
};
