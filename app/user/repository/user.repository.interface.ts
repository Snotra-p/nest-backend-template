import { Provider } from '@nestjs/common';
import { TypeormUserRepository } from './typeorm/typeorm-user.repository';
import { PrismaUserRepository } from './prisma/prisma-user.repository';
import { User } from '../domain/user';

export const userRepoToken = Symbol('UserRepository');

export const prismaUserRepository: Provider = {
  provide: userRepoToken,
  useClass: PrismaUserRepository,
};

export const typeormUserRepository: Provider = {
  provide: userRepoToken,
  useClass: TypeormUserRepository,
};

export interface UserRepository {
  save(user: Partial<User>): Promise<User>;
  findByUserId(userId: number): Promise<User>;
}
