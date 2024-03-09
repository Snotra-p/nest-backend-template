import { Module } from '@nestjs/common';
import { prismaUserRepository } from '../user.repository.interface';

@Module({
  providers: [prismaUserRepository],
  exports: [prismaUserRepository],
})
export class PrismaUserModule {}
