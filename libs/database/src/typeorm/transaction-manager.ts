import { QueryRunner } from 'typeorm';
import { DatabaseName } from '@libs/common/src/constants/config';
import { DataSourceManager } from '@libs/database/src/typeorm/data-source-manager';
import { ContextProvider } from '@libs/common/src/context/context.provider';

export class TransactionManager {
  static getQueryRunner(dbName: string): QueryRunner {
    return ContextProvider.get<QueryRunner>(`${dbName}_qr`);
  }

  static async setQueryRunner(
    queryRunner: QueryRunner,
    dbName: string,
  ): Promise<void> {
    ContextProvider.set(`${dbName}_qr`, queryRunner);
  }

  static async startQueryRunners(
    validateDatabase: DatabaseName[],
  ): Promise<QueryRunner[]> {
    return Promise.all(
      validateDatabase.map((dbName) => this.startFixedConnection(dbName)),
    );
  }

  static async startFixedConnection(
    dbName: DatabaseName,
  ): Promise<QueryRunner> {
    let queryRunner = this.getQueryRunner(dbName);
    if (queryRunner) {
      return queryRunner;
    }

    const dataSource = DataSourceManager.getDataSource(dbName);
    if (!dataSource) {
      throw new Error(
        `DataSourceManager.getDataSource(${dbName}) is undefined`,
      );
    }

    queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();

    await this.setQueryRunner(queryRunner, dbName);

    return queryRunner!;
  }

  static async startTransactions(queryRunners: QueryRunner[]): Promise<void> {
    await Promise.all(queryRunners.map((it) => it.startTransaction()));
  }

  static async commitTransactions(queryRunners: QueryRunner[]): Promise<void> {
    await Promise.all(queryRunners.map((it) => it.commitTransaction()));
  }

  static async rollbackTransactions(
    queryRunners: QueryRunner[],
  ): Promise<void> {
    await Promise.all(queryRunners.map((it) => it.rollbackTransaction()));
  }

  static async releaseTransactions(queryRunners: QueryRunner[]): Promise<void> {
    await Promise.all(queryRunners.map((it) => it.release()));
  }
}
