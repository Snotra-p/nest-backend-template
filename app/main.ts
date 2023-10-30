import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // const app = await NestFactory.create(AppModule);

  await app.listen(Number(process.env.HOST_PORT), process.env.HOST_IP);

  Logger.log(`NODE_ENV is ${process.env.NODE_ENV}`);
  Logger.log(`running in ${process.env.HOST_IP}:${process.env.HOST_PORT}`);
}
bootstrap();
