import { FastifyServer } from './fastify-server';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { RootModule } from './root.module';
import { patchRepositoryManager } from '@libs/database/src/typeorm/patch-repository-manager';

async function bootstrap(): Promise<void> {
  patchRepositoryManager();

  const wasServer = new FastifyServer();

  const app = await NestFactory.create<NestFastifyApplication>(
    RootModule,
    new FastifyAdapter(),
  );
  await wasServer.init(app);
  await wasServer.run();
}

bootstrap().then();
