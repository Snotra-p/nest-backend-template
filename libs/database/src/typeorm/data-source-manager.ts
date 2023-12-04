import { DataSource } from 'typeorm';

export class DataSourceManager {
  private static dataSources: Record<string, DataSource> = {};

  static getDataSource(databaseName: string): DataSource {
    return this.dataSources[databaseName];
  }

  static setDataSource(dataSource: DataSource): void {
    const databaseName = dataSource.manager.connection.name;
    this.dataSources[databaseName] = dataSource;
  }
}
