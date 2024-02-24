import { User } from '../entities/user.entity';
import { Provider } from '@nestjs/common';
import { TUserRepository } from './typeorm.user.repository';

export const userRepoToken = Symbol('UserRepository');

export const userRepository: Provider = {
  provide: userRepoToken,
  useClass: TUserRepository,
};

export interface IUserRepository {
  save(user: Partial<User>): Promise<User>;
  findByUserId(userId: number): Promise<User>;
}
