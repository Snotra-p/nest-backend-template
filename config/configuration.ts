import * as Joi from 'joi';
import {
  DATABASE_NAME,
  NODE_ENVIRONMENT,
} from '@libs/common/src/constants/config';

export type DatabaseConfig = {
  type: 'mysql' | 'pg';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
  synchronize: boolean;
};

export type RedisConfig = {
  host: string;
  port: number;
};

export type EnvironmentVariables = {
  env: string;
  ip: string;
  port: number;
  database: Record<string, DatabaseConfig>;
  redis: RedisConfig;
  sessionKeys: Buffer[];
};

export const configuration = (): EnvironmentVariables => ({
  env: process.env.NODE_ENV,
  ip: process.env.HOST_IP,
  port: parseInt(process.env.HOST_PORT, 10),
  sessionKeys: [
    Buffer.from(process.env.SESSION_COOKIE_KEY, 'hex'),
    Buffer.from(process.env.SESSION_COOKIE_KEY_OLD, 'hex'),
  ],
  database: {
    [DATABASE_NAME.COMMON]: {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_ID,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      entities: ['dist/app/user/entities/*.entity.!(js.map){,+(ts,js)}'],
      synchronize: true,
    },
    [DATABASE_NAME.ADMIN]: {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_ID,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      entities: ['dist/app/user/entities/*.entity.!(js.map){,+(ts,js)}'],
      synchronize: true,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
  },
});

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid(...Object.values(NODE_ENVIRONMENT)),
  HOST_IP: Joi.string().required(),
  HOST_PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_ID: Joi.string().required(),
  DB_PW: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  SESSION_COOKIE_KEY: Joi.string().required(),
  SESSION_COOKIE_KEY_OLD: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
});

export const configModuleOptions = {
  isGlobal: true,
  envFilePath:
    process.env.NODE_ENV === NODE_ENVIRONMENT.PROD
      ? null
      : `config/.${process.env.NODE_ENV}.env`,
  load: [configuration],
  validationSchema: validationSchema,
};
