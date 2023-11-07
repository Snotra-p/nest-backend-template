import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '@libs/common/src/module/auth/auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
