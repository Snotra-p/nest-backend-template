import { Injectable, Logger } from '@nestjs/common';
import { Redis as RedisClient } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(private readonly redisClient: RedisClient) {
    this._initializeEvent();
  }

  private _initializeEvent(): void {
    this.redisClient.on('connect', () => {
      Logger.log('Redis client connected');
    });

    this.redisClient.on('error', (err) => {
      Logger.error('Redis client error', err);
    });
  }

  getRedisClient(): RedisClient {
    return this.redisClient;
  }

  getValue(key: string): Promise<string> {
    return this.redisClient.get(key);
  }

  setValue(key: string, value: string): Promise<string> {
    return this.redisClient.set(key, value);
  }
}
