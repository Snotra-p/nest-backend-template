import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ServerErrorException } from './server-error-exception';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ErrorBody } from '@libs/common/src/response/error-body';

@Injectable()
export class ServerErrorHandler {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  serverExceptionHandle(
    exception: ServerErrorException,
    ctx: HttpArgumentsHost,
  ): void {
    const { httpAdapter } = this.httpAdapterHost;
    const request = ctx.getResponse<Request>();

    const body: ErrorBody = {
      code: exception.customErrorCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    };
    httpAdapter.reply(request, body, exception.getStatus());
    Logger.error(exception.stack);
  }

  httpExceptionHandle(exception: HttpException, ctx: HttpArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const httpStatus = exception.getStatus();

    const responseBody: ErrorBody = {
      code: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: exception.message || exception.name,
    };

    httpAdapter.reply(ctx.getResponse<Response>(), responseBody, httpStatus);
  }
}
