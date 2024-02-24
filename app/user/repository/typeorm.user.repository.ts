import { BaseRepository } from '@libs/database/src/typeorm/base/base.repository';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DatabaseName } from '@libs/common/src/constants/config';
import { IUserRepository } from './user.repository.interface';

export class TUserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(
    @InjectDataSource(DatabaseName.CORE)
    protected readonly dataSource: DataSource,
  ) {
    super(User, dataSource.manager);
  }

  async findByUserId(userId: number): Promise<User> {
    return this.manager
      .createQueryBuilder()
      .where(`${this.entityAlias}.userId=:userId`, { userId: userId })
      .getOne();
  }
}
