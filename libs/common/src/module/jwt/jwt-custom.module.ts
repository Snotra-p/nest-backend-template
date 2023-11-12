import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@config/configuration';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (
        configService: ConfigService<EnvironmentVariables>,
      ): JwtModuleOptions => ({
        global: true,
        privateKey: configService.get('jwt.privateKey', { infer: true }),
        publicKey: configService.get('jwt.publicKey', { infer: true }),
        signOptions: {
          algorithm: 'ES256',
        },
        verifyOptions: {
          algorithms: ['ES256'],
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class JwtCustomModule {}
