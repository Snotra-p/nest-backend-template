import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userRepository } from './repository/user.repository.interface';
import { UserGateway } from './user.gateway';

@Module({
  controllers: [UserController],
  providers: [UserService, userRepository, UserGateway],
  exports: [UserService, userRepository],
})
export class UserModule {}
