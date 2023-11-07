export enum SERVER_ERROR_CODE {
  SESSION_EXPIRED = 1000,
  USER_NOT_FOUND = 1001,
}

export const SERVER_ERROR_CODE_MESSAGE = {
  [SERVER_ERROR_CODE.SESSION_EXPIRED]: '세션이 만료되었습니다.',
  [SERVER_ERROR_CODE.USER_NOT_FOUND]: '유저를 찾을 수 없습니다.',
};

export type ServerErrorCodeMessage = typeof SERVER_ERROR_CODE_MESSAGE;
