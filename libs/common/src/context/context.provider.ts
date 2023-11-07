import { ClsServiceManager } from 'nestjs-cls';
import { QueryRunner } from 'typeorm';

export class ContextProvider {
  static get<T>(key: string): T {
    return ClsServiceManager.getClsService().get(key);
  }

  static set<T>(key: string, value: T): void {
    ClsServiceManager.getClsService().set(key, value);
  }

  static getQueryRunner(dbName: string): QueryRunner {
    return ContextProvider.get(`${dbName}_qb`);
  }

  static setQueryRunner(queryRunner: QueryRunner, dbName: string): void {
    ContextProvider.set(`${dbName}_qb`, queryRunner);
  }
}
