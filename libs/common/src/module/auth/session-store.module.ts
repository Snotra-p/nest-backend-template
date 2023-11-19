import {
  DynamicModule,
  Global,
  Inject,
  Module,
  NestModule,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import fastifySession, { FastifySessionOptions } from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
import { RedisModule } from '@libs/database/src/redis/redis.module';
import { Redis as RedisClient } from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@config/configuration';
import { NodeEnvironment } from '@libs/common/src/constants/config';
import RedisStore from 'connect-redis';

const FASTIFY_SESSION_OPTIONS = Symbol('FASTIFY_SESSION_OPTIONS');

/**
 * this is only used for fastify
 */
@Global()
@Module({})
export class SessionStoreModule implements NestModule {
  constructor(
    private readonly adapterHost: HttpAdapterHost,
    @Inject(FASTIFY_SESSION_OPTIONS)
    private readonly options: FastifySessionOptions,
  ) {}

  configure(): void {
    const fastifyInstance = this.adapterHost?.httpAdapter?.getInstance();
    if (!fastifyInstance) {
      throw new Error('fastify not found');
    }

    fastifyInstance.register(fastifyCookie);
    fastifyInstance.register(fastifySession, this.options);
  }

  static registerAsync(): DynamicModule {
    return this._getRedisStore();
  }

  private static _getRedisStore(): DynamicModule {
    return {
      imports: [RedisModule],
      module: SessionStoreModule,
      providers: [
        {
          provide: FASTIFY_SESSION_OPTIONS,
          useFactory: (
            redisClient: RedisClient,
            configService: ConfigService<EnvironmentVariables>,
          ): FastifySessionOptions => ({
            cookie: {
              path: '/',
              httpOnly: true,
              secure: configService.get('env') === NodeEnvironment.PROD,
              sameSite: 'strict', // csrf protection
              maxAge: 86400000, // 1 day
            },
            saveUninitialized: false,
            secret: configService.get('sessionKeys', { infer: true }),
            store: new RedisStore({
              client: redisClient,
            }),
          }),
          inject: [RedisClient, ConfigService],
        },
      ],
    };
  }
}
