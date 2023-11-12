export enum NodeEnvironment {
  TEST = 'test',
  LOCAL = 'local',
  DEV = 'dev',
  PROD = 'prod',
}

export enum DATABASE_NAME {
  CORE = 'core',
  ADMIN = 'admin',
}

export const JWT_ACCESS_EXPIRES_IN = '1d';

export const JWT_REFRESH_EXPIRES_IN = '7d';
