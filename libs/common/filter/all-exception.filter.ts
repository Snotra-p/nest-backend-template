import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { AllErrorHandler } from '../error/all-error-handler';
import { ServerError } from '../error/server-error';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(Error)
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private errorHandler: AllErrorHandler,
  ) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        message: exception.message,
        error: exception.name,
      };

      return httpAdapter.reply(
        ctx.getResponse<Response>(),
        responseBody,
        httpStatus,
      );
    }

    if (exception instanceof ServerError) {
      return this.errorHandler.serverExceptionHandle(exception, ctx);
    }

    const responseBody = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'critical error occur',
    };

    Logger.error(exception.stack);

    return httpAdapter.reply(
      ctx.getResponse<Response>(),
      responseBody,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
