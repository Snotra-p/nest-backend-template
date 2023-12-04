import { ClsServiceManager } from 'nestjs-cls';
import { QueryRunner } from 'typeorm';
import { SESSION_DATA_KEY } from '@libs/common/src/module/auth/constants/auth.constants';
import { SessionData } from '@libs/common/src/module/auth/type/session-data';
import { DatabaseName } from '@libs/common/src/constants/config';

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
    if (this.getQueryRunner(dbName)) return;

    ContextProvider.set(`${dbName}_qb`, queryRunner);
  }

  static startQueryRunners(validateDatabase: DatabaseName[]) {
    return validateDatabase.map((dbName) => {
      const queryRunner = ContextProvider.getQueryRunner(dbName);
      return queryRunner;
    });
  }
}
