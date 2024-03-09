import { Inject, Injectable } from '@nestjs/common';

import { Transactional } from '@libs/database/src/typeorm/transactional.decorator';
import { DatabaseName } from '@libs/common/src/constants/config';
import {
  UserRepository,
  userRepoToken,
} from './repository/user.repository.interface';
import { User } from './domain/user';

@Injectable()
export class UserService {
  constructor(
    @Inject(userRepoToken) private readonly userRepository: UserRepository,
  ) {}

  @Transactional(DatabaseName.CORE)
  async create(): Promise<User[]> {
    const a = await this.userRepository.save({
      phoneNumber: 123,
    });

    const b = await this.userRepository.save({
      phoneNumber: 1234,
    });

    return [a, b];
  }
}
