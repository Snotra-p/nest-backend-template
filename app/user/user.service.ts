import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Transactional } from '@libs/database/src/typeorm/transactional.decorator';
import { DatabaseName } from '@libs/common/src/constants/config';
import {
  IUserRepository,
  userRepoToken,
} from './repository/user.repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(userRepoToken) private readonly userRepository: IUserRepository,
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
