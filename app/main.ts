import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.listen(3000, process.env.HOST_IP);

  Logger.log(`NODE_ENV is ${process.env.NODE_ENV}`);
  Logger.log(`running in ${process.env.HOST_IP}:3000`);
}
bootstrap();
