import { UserRepository } from '../user.repository.interface';
import { User } from '../../domain/user';
import { PrismaService } from 'nestjs-prisma';
import { DomainId } from '@libs/common/src/base/entity';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: DomainId): Promise<User | undefined> {
    const value = await this.prisma.user.findUnique({ where: { id: id } });
    return value ? User.create(value) : undefined;
  }

  async save(user: User): Promise<User> {
    const value = await this.prisma.user.create({ data: user });
    return User.create(value);
  }
}
