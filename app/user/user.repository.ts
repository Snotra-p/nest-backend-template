import { BaseRepository } from '@libs/database/src/base/base.repository';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DATABASE_NAME } from '@libs/common/src/constants/config';

export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectDataSource(DATABASE_NAME.CORE)
    protected readonly dataSource: DataSource,
  ) {
    super(User, dataSource.manager);
  }

  async findByUserId(userId: number): Promise<User> {
    return this.getQueryBuilder()
      .where(`${this.entityAlias}.userId=:userId`, { userId: userId })
      .getOne();
  }
}
