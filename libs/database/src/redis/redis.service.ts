import { Injectable, Logger } from '@nestjs/common';
import { Redis as RedisClient } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(private readonly redisClient: RedisClient) {
    this.initializeEvent();
  }

  initializeEvent(): void {
    this.redisClient.on('connect', () => {
      Logger.log('Redis client connected');
    });

    this.redisClient.on('error', (err) => {
      Logger.error('Redis client error', err);
    });
  }
}
