import { EntityManager, ObjectLiteral, Repository } from 'typeorm';

export abstract class TypeormBaseRepository<
  T extends ObjectLiteral,
> extends Repository<T> {
  protected readonly entityAlias: string;

  protected constructor(
    entityClass: new () => T,
    entityManager: EntityManager,
  ) {
    // const dataSourceName = entityManager.connection.name;
    const target = entityManager.getRepository(entityClass).target;
    super(target, entityManager, entityManager.queryRunner);
    this.entityAlias =
      entityManager.getRepository(entityClass).metadata.tableName;
  }
}
