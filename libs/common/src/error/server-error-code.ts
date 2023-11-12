export enum ServerErrorCode {
  SESSION_EXPIRED = 1000,
  USER_NOT_FOUND = 1001,
}

export const ServerErrorCodeMessage = {
  [ServerErrorCode.SESSION_EXPIRED]: '세션이 만료되었습니다.',
  [ServerErrorCode.USER_NOT_FOUND]: '유저를 찾을 수 없습니다.',
};
