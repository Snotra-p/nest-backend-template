import { HttpStatus } from '@nestjs/common';
import { ConstValue } from '@libs/common/src/base/util-type';

type ErrorDetails = {
  code: number;
  message: string;
  httpStatus: HttpStatus;
};

export type ServerErrorKey = ConstValue<typeof ServerErrorKey>;

export const ServerErrorKey = {
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  DB_STATUS_INVALID: 'DB_STATUS_INVALID',
} as const;

export const ServerErrors: Record<ServerErrorKey, ErrorDetails> = {
  [ServerErrorKey.SESSION_EXPIRED]: {
    code: 1000,
    message: '세션이 만료되었습니다.',
    httpStatus: HttpStatus.BAD_REQUEST,
  },
  [ServerErrorKey.USER_NOT_FOUND]: {
    code: 1001,
    message: '유저를 찾을 수 없습니다.',
    httpStatus: HttpStatus.BAD_REQUEST,
  },
  [ServerErrorKey.DB_STATUS_INVALID]: {
    code: 1002,
    message: 'DB에 문제가 있습니다.',
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
  },
} as const;

export type ServerErrorCode =
  (typeof ServerErrors)[keyof typeof ServerErrors]['code'];
