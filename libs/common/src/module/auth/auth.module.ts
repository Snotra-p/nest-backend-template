import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '@libs/common/src/module/auth/auth.service';

@Module({
  imports: [
    // JwtCustomModule,
    // PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    AuthService,
    // JwtStrategy,
  ],
})
export class AuthModule {}
