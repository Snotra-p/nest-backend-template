import { BaseRepository } from '@libs/database/src/base/base.repository';

import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectEntityManager()
    protected readonly entityManager: EntityManager,
  ) {
    super(User, entityManager);
  }

  async findByUserId(userId: number): Promise<User> {
    return this.getQueryBuilder()
      .where(`${this.entityAlias}.userId=:userId`, { userId: userId })
      .getOne();
    // return await this.getQueryBuilder()
  }
}
