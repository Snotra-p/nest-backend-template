import { EntityManager, Repository } from 'typeorm';
import { TransactionManager } from '@libs/database/src/typeorm/transaction-manager';

export function patchRepositoryManager(): void {
  const originalManagerKey = Symbol('originalManager');

  Object.defineProperty(Repository.prototype, 'manager', {
    get() {
      const originalManager = this[originalManagerKey];

      const connectionName = originalManager.connection.name;
      const queryRunner = TransactionManager.getQueryRunner(connectionName);
      if (queryRunner) {
        return queryRunner.manager;
      }
      return originalManager;
    },
    set(manager: EntityManager | undefined) {
      this[originalManagerKey] = manager;
    },
    configurable: true,
  });
}
