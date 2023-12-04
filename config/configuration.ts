import * as Joi from 'joi';
import {
  DatabaseName,
  NodeEnvironment,
} from '@libs/common/src/constants/config';
import { decode } from 'js-base64';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModuleOptions } from '@nestjs/config';

export type RedisConfig = {
  host: string;
  port: number;
};

export type JwtKeys = {
  privateKey: string;
  publicKey: string;
};

export type EnvironmentVariables = {
  env: string;
  ip: string;
  port: number;
  database: Record<DatabaseName, TypeOrmModuleOptions>;
  redis: RedisConfig;
  sessionKeys: Buffer[];
  jwt: JwtKeys;
};

export const configuration = (): EnvironmentVariables => ({
  env: process.env.NODE_ENV!,
  ip: process.env.HOST_IP!,
  port: parseInt(process.env.HOST_PORT!, 10),
  sessionKeys: [
    Buffer.from(process.env.SESSION_KEY!, 'hex'),
    Buffer.from(process.env.SESSION_KEY_OLD!, 'hex'),
  ],
  database: {
    [DatabaseName.CORE]: {
      type: 'mysql',
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_ID!,
      password: process.env.DB_PW!,
      name: 'default',
      database: DatabaseName.CORE,
      entities: ['dist/app/*/entities/*.entity.!(js.map){,+(ts,js)}'],
      synchronize: true,
    },
    [DatabaseName.ADMIN]: {
      type: 'mysql',
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_ID!,
      password: process.env.DB_PW!,
      name: 'admin',
      database: DatabaseName.ADMIN,
      entities: ['dist/app/*/entities/*.entity.!(js.map){,+(ts,js)}'],
      synchronize: true,
    },
  },
  redis: {
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!, 10),
  },
  jwt: {
    privateKey: decode(process.env.JWT_PRIVATE_KEY!),
    publicKey: decode(process.env.JWT_PUBLIC_KEY!),
  },
});

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid(...Object.values(NodeEnvironment)),
  HOST_IP: Joi.string().required(),
  HOST_PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_ID: Joi.string().required(),
  DB_PW: Joi.string().required(),
  SESSION_KEY: Joi.string().required(),
  SESSION_KEY_OLD: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  JWT_PRIVATE_KEY: Joi.string().required(),
  JWT_PUBLIC_KEY: Joi.string().required(),
});

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath:
    process.env.NODE_ENV === NodeEnvironment.PROD
      ? []
      : `config/.${process.env.NODE_ENV}.env`,
  load: [configuration],
  validationSchema: validationSchema,
};
