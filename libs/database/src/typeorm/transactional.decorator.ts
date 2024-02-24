import { DatabaseName } from '@libs/common/src/constants/config';
import { ServerErrorKey } from '@libs/common/src/error/server-error-code';
import { ServerErrorException } from '@libs/common/src/error/server-error-exception';
import { TransactionManager } from '@libs/database/src/typeorm/transaction-manager';

export function Transactional(
  ...databaseNames: DatabaseName[]
): MethodDecorator {
  return (
    target: unknown,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originMethod = descriptor.value;

    descriptor.value = async function (
      ...originMethodArgs: any[]
    ): Promise<PropertyDescriptor> {
      const queryRunners =
        await TransactionManager.startQueryRunners(databaseNames);

      if (queryRunners.length === 0) {
        throw new ServerErrorException(ServerErrorKey.DB_STATUS_INVALID);
      }

      await TransactionManager.startTransactions(queryRunners);
      try {
        const result = await originMethod.apply(this, originMethodArgs);
        await TransactionManager.commitTransactions(queryRunners);
        return result;
      } catch (error) {
        await TransactionManager.rollbackTransactions(queryRunners);
        throw error;
      } finally {
        await TransactionManager.releaseTransactions(queryRunners);
      }
    };

    return descriptor;
  };
}
