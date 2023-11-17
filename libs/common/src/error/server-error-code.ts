import { HttpStatus } from '@nestjs/common';
import {
  ErrorDetails,
  ServerErrorKey,
} from '@libs/common/src/error/type/server-error.type';

// Defining the keys as a const ensures they are treated as literal types
export const ServerErrorKeys = {
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
} as const;

export const ServerErrors: Record<ServerErrorKey, ErrorDetails> = {
  [ServerErrorKeys.SESSION_EXPIRED]: {
    code: 1000,
    message: '세션이 만료되었습니다.',
    httpStatus: HttpStatus.BAD_REQUEST,
  },
  [ServerErrorKeys.USER_NOT_FOUND]: {
    code: 1001,
    message: '유저를 찾을 수 없습니다.',
    httpStatus: HttpStatus.NOT_FOUND,
  },
} as const;
