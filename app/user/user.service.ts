import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { Transactional } from '@libs/database/src/typeorm/transactional.decorator';
import { DatabaseName } from '@libs/common/src/constants/config';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  @Transactional(DatabaseName.CORE)
  async create(): Promise<User[]> {
    const a = await this.userRepository.save(
      {
        phoneNumber: 123,
      },
      { reload: true },
    );

    const b = await this.userRepository.save({
      phoneNumber: 1234,
    });

    return [a, b];
  }
}
