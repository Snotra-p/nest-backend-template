import { ConstValue } from '@libs/common/src/base/util-type';

export const NodeEnvironment = {
  TEST: 'test',
  LOCAL: 'local',
  DEV: 'dev',
  PROD: 'prod',
} as const;

export type NodeEnvironment = ConstValue<typeof NodeEnvironment>;

export const DatabaseName = {
  CORE: 'core',
  ADMIN: 'admin',
} as const;

export type DatabaseName = ConstValue<typeof DatabaseName>;

export const JWT_ACCESS_EXPIRES_IN = '1d';

export const JWT_REFRESH_EXPIRES_IN = '7d';
