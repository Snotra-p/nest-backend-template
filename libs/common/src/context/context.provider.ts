import { ClsServiceManager } from 'nestjs-cls';
import { QueryRunner } from 'typeorm';
import { SESSION_DATA_KEY } from '@libs/common/src/module/auth/constants/auth.constants';
import { SessionData } from '@libs/common/src/module/auth/type/session-data';

export class ContextProvider {
  static get<T>(key: string | symbol): T {
    return ClsServiceManager.getClsService().get(key);
  }

  static set<T>(key: string | symbol, value: T): void {
    ClsServiceManager.getClsService().set(key, value);
  }

  static getSessionData(): SessionData {
    return ContextProvider.get(SESSION_DATA_KEY);
  }

  static setSessionData(data: SessionData): void {
    ContextProvider.set(SESSION_DATA_KEY, data);
  }

  static getQueryRunner(dbName: string): QueryRunner {
    return ContextProvider.get(`${dbName}_qb`);
  }

  static setQueryRunner(queryRunner: QueryRunner, dbName: string): void {
    ContextProvider.set(`${dbName}_qb`, queryRunner);
  }
}
