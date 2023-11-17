import { SessionData } from '@libs/common/src/module/auth/type/session-data';

declare module 'fastify' {
  interface Session {
    data: SessionData;
  }
}
