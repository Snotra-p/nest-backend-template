import {
  RoleType,
  TokenType,
} from '@libs/common/src/module/auth/constants/auth.constants.enum';

/**
 * @description
 * SessionPayload is a type that is used to store the user's information
 * it can be jwt payload or session's payload
 */
export type AuthPayload = {
  id: number;
  email: string;
  role: RoleType;
  type: TokenType;
};
