import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { prismaUserRepository } from './repository/user.repository.interface';
import { UserGateway } from './user.gateway';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, prismaUserRepository, UserGateway],
  exports: [UserService, prismaUserRepository],
})
export class UserModule {}
