import {
  ServerErrorKeys,
  ServerErrors,
} from '@libs/common/src/error/server-error-code';

export type ServerErrorKey =
  (typeof ServerErrorKeys)[keyof typeof ServerErrorKeys];

export type ServerErrorCode = keyof typeof ServerErrors;
export type ServerErrorMessage =
  (typeof ServerErrors)[ServerErrorCode]['message'];
export type ServerErrorHttpStatus =
  (typeof ServerErrors)[ServerErrorCode]['httpStatus'];

export type ErrorBody = {
  code: number;
  timestamp: string;
  path: string;
  message: string;
};

export type ErrorDetails = {
  code: number;
  message: string;
  httpStatus: number;
};
