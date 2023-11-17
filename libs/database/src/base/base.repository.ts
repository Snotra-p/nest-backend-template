import { EntityManager, Repository } from 'typeorm';
import { ContextProvider } from '@libs/common/src/context/context.provider';

export abstract class BaseRepository<T> extends Repository<T> {
  protected readonly entityAlias: string;
  protected readonly entityManager: EntityManager;

  protected constructor(
    entityClass: new () => T,
    entityManager: EntityManager,
  ) {
    const dataSourceName = entityManager.connection.name;
    const queryRunner = ContextProvider.getQueryRunner(dataSourceName);
    const manager = queryRunner ? queryRunner.manager : entityManager;
    const target = manager.getRepository(entityClass).target;
    super(target, manager, manager.queryRunner);
    this.entityAlias =
      entityManager.getRepository(entityClass).metadata.tableName;
  }
}
