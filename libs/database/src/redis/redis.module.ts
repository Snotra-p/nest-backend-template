import { Inject, Module } from '@nestjs/common';
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
      ): unknown =>
        new Redis({
          ...configService.get('redis'),
          retryStrategy: (times: number): number | null => {
            if (times >= 5) {
              return 60 * 1000;
            }
            return Math.min(times * 50, 2000);
          },
          maxRetriesPerRequest: null,
        }),
      inject: [ConfigService],
    },
  ],
  exports: [RedisClient],
})
export class RedisModule {
  constructor(@Inject(RedisClient) private readonly redisClient: RedisClient) {}

  /**
   * Handle process termination to close Redis connection properly
   * it can be good for testing, don't need to manually close just app closed
   */
  async onModuleDestroy(): Promise<void> {
    await this.redisClient.quit();
  }
}
