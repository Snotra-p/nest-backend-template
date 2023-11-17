import { ConstValue } from '@libs/common/src/base/util-type';

export const AuthStrategy = {
  JWT: 'jwt',
  SESSION: 'session',
};
export type AuthStrategy = ConstValue<typeof AuthStrategy>;

export const RoleType = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export type RoleType = ConstValue<typeof RoleType>;

export const TokenType = {
  ACCESS: 'ACCESS',
  REFRESH: 'REFRESH',
};

export type TokenType = ConstValue<typeof TokenType>;
