import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';

import { AllErrorHandler } from '../error/all-error-handler';
import { ServerError } from '../error/server-error';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch(Error)
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private errorHandler: AllErrorHandler) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    if (exception instanceof ServerError) {
      this.errorHandler.serverExceptionHandle(exception, request, response);
    }

    response.code(500).send('Internal Server Error');

    Logger.error(exception.stack, request.url);
  }
}
