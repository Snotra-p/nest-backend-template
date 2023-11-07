import { EntityManager, EntityTarget, SelectQueryBuilder } from 'typeorm';
import { ContextProvider } from '@libs/common/src/context/context.provider';

export abstract class BaseRepository<T> {
  private readonly target: EntityTarget<T>;
  protected readonly entityAlias: string;
  protected readonly entityManager: EntityManager;

  protected constructor(
    entityClass: new () => T,
    entityManager: EntityManager,
  ) {
    this.entityAlias =
      entityManager.getRepository(entityClass).metadata.tableName;
    this.entityManager = entityManager;
    this.target = entityManager.getRepository(entityClass).target;
  }

  protected getQueryBuilder(dataSource?: string): SelectQueryBuilder<T> {
    const queryRunner = ContextProvider.getQueryRunner(dataSource);
    const manager = queryRunner ? queryRunner.manager : this.entityManager;
    return manager.createQueryBuilder<T>(this.target, this.entityAlias);
  }
}
