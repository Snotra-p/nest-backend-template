import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { typeormUserRepository } from './repository/user.repository.interface';
import { UserGateway } from './user.gateway';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, typeormUserRepository, UserGateway],
  exports: [UserService, typeormUserRepository],
})
export class UserModule {}
