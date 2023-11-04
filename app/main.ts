import { FastifyServer } from './fastify-server';

async function bootstrap(): Promise<void> {
  const wasServer = new FastifyServer();
  await wasServer.init();
  await wasServer.run();
}

bootstrap().then();
