import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ServerError } from './server-error';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Injectable()
export class AllErrorHandler {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  serverExceptionHandle(exception: ServerError, ctx: HttpArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const request = ctx.getResponse<Request>();

    const body = {
      statusCode: exception.code,
      message: exception.message,
      path: request.url,
    };
    httpAdapter.reply(request, body, HttpStatus.OK);
    Logger.error(exception.stack);
  }
}
