import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { ServerErrorHandler } from '../error/server-error-handler';
import { HttpAdapterHost } from '@nestjs/core';
import { ServerErrorException } from '@libs/common/src/error/server-error-exception';
import { ErrorBody } from '@libs/common/src/error/type/server-error.type';

@Catch(Error)
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly errorHandler: ServerErrorHandler,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    if (exception instanceof ServerErrorException) {
      return this.errorHandler.serverExceptionHandle(exception, ctx);
    }

    if (exception instanceof HttpException) {
      const httpStatus = exception.getStatus();

      const responseBody: ErrorBody = {
        code: 0,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        message: exception.message || exception.name,
      };

      return httpAdapter.reply(
        ctx.getResponse<Response>(),
        responseBody,
        httpStatus,
      );
    }

    const responseBody: ErrorBody = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: 'critical error occur',
    };

    Logger.error((exception as Error).stack);

    return httpAdapter.reply(
      ctx.getResponse<Response>(),
      responseBody,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
