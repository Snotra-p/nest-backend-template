import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '@libs/common/src/module/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { AUTH_STRATEGY } from '@libs/common/src/module/auth/constants/auth.constants.enum';

@Module({
  imports: [
    // JwtCustomModule,
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule.register({
      defaultStrategy: AUTH_STRATEGY.SESSION,
      session: true,
    }),
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
