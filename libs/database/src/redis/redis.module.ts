import { Module } from '@nestjs/common';
import { Redis as RedisClient } from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@libs/database/src/redis/redis.service';
import { EnvironmentVariables } from '@config/configuration';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Redis = require('ioredis');

@Module({
  providers: [
    RedisService,
    {
      provide: RedisClient,
      useFactory: (
        configService: ConfigService<EnvironmentVariables>,
      ): unknown => {
        return new Redis({
          ...configService.get('redis'),
          retryStrategy: (times: number): number | null => {
            if (times > 10) {
              return 60 * 1000;
            }
            return Math.min(times * 50, 2000);
          },
          maxRetriesPerRequest: null,
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class RedisModule {}
