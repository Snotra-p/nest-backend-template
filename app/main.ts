import { FastifyServer } from './fastify-server';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { RootModule } from './root.module';
import { patchRepositoryManager } from '@libs/database/src/typeorm/patch-repository-manager';
import { UwIoMongoAdapter } from '@libs/common/src/module/websocket/uw-io-mongo-adapter';
import { Collection, Document, MongoClient } from 'mongodb';
import { Logger } from '@nestjs/common';
import { MongoSocketIoConfig } from '@config/configuration';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
  patchRepositoryManager();

  const wasServer = new FastifyServer();

  const app = await NestFactory.create<NestFastifyApplication>(
    RootModule,
    new FastifyAdapter(),
  );

  // const uwsApp = initUws();
  const config = app
    .get<ConfigService>(ConfigService)
    .get<MongoSocketIoConfig>('mongo')!;
  const mongoCollection = await initMongoClient(config);

  app.enableCors();
  app.useWebSocketAdapter(new UwIoMongoAdapter(mongoCollection));

  await wasServer.init(app);
  await wasServer.run();
}

// function initUws(): UWS.TemplatedApp {
//   const uwsApp = UWS.App();
//
//   uwsApp.listen(8081, (token: unknown) => {
//     if (token) {
//       Logger.log(`Server listening on port ${8081}`);
//     } else {
//       Logger.warn('Failed to start server: port already in use');
//     }
//   });
//   return uwsApp;
// }

async function createMongoCollection(
  mongoClient: MongoClient,
  DB: string,
  COLLECTION: string,
): Promise<void> {
  try {
    await mongoClient.db(DB).createCollection(COLLECTION, {
      capped: true,
      size: 1e6,
    });
  } catch (e: any) {
    Logger.error('MongoDB setup error:', e.message);
  }
}

async function initMongoClient(
  config: MongoSocketIoConfig,
): Promise<Collection<Document>> {
  const { database, uri, socketCollection } = config;

  const mongoClient = new MongoClient(uri);

  await mongoClient.connect();

  const collection = mongoClient.db(database).collection(socketCollection);

  if (!collection) {
    await createMongoCollection(mongoClient, database, socketCollection);
  }
  Logger.log('MongoDB adapter setup complete.');

  return mongoClient.db(database).collection(socketCollection)!;
}

bootstrap().then();
