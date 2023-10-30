import * as Joi from 'joi';

enum NODE_ENVIRONMENT {
  LOCAL = 'local',
  DEV = 'dev',
  PROD = 'prod',
}

export const configuration = (): EnvironmentVariables => ({
  ip: process.env.HOST_IP,
  port: parseInt(process.env.HOST_PORT, 10),
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
  },
});

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid(...Object.values(NODE_ENVIRONMENT)),
  HOST_IP: Joi.string().required(),
  HOST_PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
});

export type DatabaseConfig = {
  host: string;
  port: number;
};

export type EnvironmentVariables = {
  ip: string;
  port: number;
  database: DatabaseConfig;
};
