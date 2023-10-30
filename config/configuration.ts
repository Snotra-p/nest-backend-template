import * as Joi from 'joi';

export const configuration = (): EnvironmentVariables => ({
  ip: process.env.HOST_IP || 'localhost',
  port: parseInt(process.env.HOST_PORT, 10),
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
  },
});

export const validationSchema = Joi.object({
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
