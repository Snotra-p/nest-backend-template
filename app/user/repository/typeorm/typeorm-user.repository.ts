import { TypeormBaseRepository } from '@libs/database/src/typeorm/base/typeorm-base-repository';
import { DataSource } from 'typeorm';

import { InjectDataSource } from '@nestjs/typeorm';
import { DatabaseName } from '@libs/common/src/constants/config';
import { UserRepository } from '../user.repository.interface';
import { UserEntity } from './user.entity';
import { User } from '../../domain/user';

export class TypeormUserRepository
  extends TypeormBaseRepository<UserEntity>
  implements UserRepository
{
  constructor(
    @InjectDataSource(DatabaseName.CORE)
    protected readonly dataSource: DataSource,
  ) {
    super(UserEntity, dataSource.manager);
  }

  async findByUserId(userId: number): Promise<User> {
    return this.manager
      .createQueryBuilder()
      .where(`${this.entityAlias}.userId=:userId`, { userId: userId })
      .getOne();
  }
}
