import { ClsServiceManager } from 'nestjs-cls';
import { QueryRunner } from 'typeorm';
import { SESSION_ORIGINAL_KEY } from '@libs/common/src/module/auth/constants/auth.constants';
import { SessionData } from '@libs/common/src/module/auth/type/session-data';

export class ContextProvider {
  static get<T>(key: string | symbol): T {
    return ClsServiceManager.getClsService().get(key);
  }

  static set<T>(key: string | symbol, value: T): void {
    ClsServiceManager.getClsService().set(key, value);
  }

  static getSessionData(): SessionData {
    return ContextProvider.get(SESSION_ORIGINAL_KEY);
  }

  static setSessionData(data: SessionData): void {
    const session = ContextProvider.getSessionData();
    if (session) {
      Object.assign(session, data);
    }

    ContextProvider.set(SESSION_ORIGINAL_KEY, data);
  }

  static getQueryRunner(dbName: string): QueryRunner {
    return ContextProvider.get(`${dbName}_qb`);
  }

  static setQueryRunner(queryRunner: QueryRunner, dbName: string): void {
    ContextProvider.set(`${dbName}_qb`, queryRunner);
  }
}
