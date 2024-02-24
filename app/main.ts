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

async function bootstrap(): Promise<void> {
  patchRepositoryManager();

  const wasServer = new FastifyServer();

  const app = await NestFactory.create<NestFastifyApplication>(
    RootModule,
    new FastifyAdapter(),
  );

  // const uwsApp = initUws();
  const mongoCollection = await initMongoClient();

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

async function initMongoClient(): Promise<Collection<Document>> {
  const DB = 'mydb';
  const COLLECTION = 'socket.io-adapter-events';
  const MONGO_URI = 'mongodb://admin:1234@localhost:30000/?replicaSet=rs0';

  const mongoClient = new MongoClient(MONGO_URI);

  await mongoClient.connect();

  const collection = mongoClient.db(DB).collection(COLLECTION);

  if (!collection) {
    await createMongoCollection(mongoClient, DB, COLLECTION);
  }
  Logger.log('MongoDB adapter setup complete.');

  return mongoClient.db(DB).collection(COLLECTION)!;
}

bootstrap().then();
