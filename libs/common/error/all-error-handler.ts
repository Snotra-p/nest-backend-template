import { Injectable } from '@nestjs/common';

import { ServerError } from './server-error';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class AllErrorHandler {
  serverExceptionHandle(
    exception: ServerError,
    request: FastifyRequest,
    response: FastifyReply,
  ): void {
    // transaction rollback
    // logging

    response.code(200).send({
      statusCode: exception.code,
      message: exception.message,
      path: request.url,
    });
  }
}
