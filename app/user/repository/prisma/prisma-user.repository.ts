import { UserRepository } from '../user.repository.interface';
import { User } from '../../domain/user';
import { PrismaService } from 'nestjs-prisma';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByUserId(userId: number): Promise<User> {
    return Promise.resolve(new User());
  }

  save(user: Partial<User>): Promise<User> {
    return Promise.resolve(new User());
  }
}
