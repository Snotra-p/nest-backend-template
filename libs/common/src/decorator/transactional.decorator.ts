import { DatabaseName } from '@libs/common/src/constants/config';
import { ContextProvider } from '@libs/common/src/context/context.provider';
import { ServerErrorKey } from '@libs/common/src/error/server-error-code';
import { ServerErrorException } from '@libs/common/src/error/server-error-exception';
import { QueryRunner } from 'typeorm';

export function Transactional(
  ...databaseNames: DatabaseName[]
): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originMethod = descriptor.value;

    descriptor.value = async function (
      ...originMethodArgs: any[]
    ): Promise<PropertyDescriptor> {
      const validateDatabase = databaseNames.filter((name) =>
        Object.values(DatabaseName)
          .filter((name) => !!name)
          .includes(name),
      );

      if (validateDatabase.length === 0) {
        throw new ServerErrorException(ServerErrorKey.DB_STATUS_INVALID);
      }

      const queryRunners = ContextProvider.startQueryRunners(validateDatabase);

      if (queryRunners.length === 0) {
        throw new ServerErrorException(ServerErrorKey.DB_STATUS_INVALID);
      }

      await transactionStart(queryRunners);

      try {
        const methodResult = await originMethod.apply(this, originMethodArgs);
        await transactionCommit(queryRunners);
        return methodResult;
      } catch (e) {
        await transactionRollBack(queryRunners);
        throw e;
      }
    };

    // return descriptor;
  };
}

function getQueryRunners(databaseNames: string[]): QueryRunner[] {
  return databaseNames.map((database) =>
    ContextProvider.getQueryRunner(database),
  );
}

async function transactionStart(queryRunners: QueryRunner[]): Promise<void> {
  await Promise.all(queryRunners.map((it) => it.startTransaction()));
}

async function transactionCommit(queryRunners: QueryRunner[]): Promise<void> {
  await Promise.all([
    ...queryRunners.map((it) => it.commitTransaction()),
    ...queryRunners.map((it) => it.release()),
  ]);
}

async function transactionRollBack(queryRunners: QueryRunner[]): Promise<void> {
  await Promise.all([
    ...queryRunners.map((it) => it.rollbackTransaction()),
    ...queryRunners.map((it) => it.release()),
  ]);
}
