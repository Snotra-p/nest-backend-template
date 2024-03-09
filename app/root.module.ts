import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ClsModule } from 'nestjs-cls';
import { HealthModule } from '@libs/common/src/module/health-checker/health-module';
import { ServerErrorHandler } from '@libs/common/src/error/server-error-handler';
import { AllExceptionFilter } from '@libs/common/src/filter/all-exception.filter';
import { AuthModule } from '@libs/common/src/module/auth/auth.module';
import { SessionStoreModule } from '@libs/common/src/module/auth/session-store.module';
import {
  configModuleOptions,
  EnvironmentVariables,
} from '@config/configuration';
import { UserModule } from './user/user.module';
import { TypeOrmCustomModule } from '@libs/database/src/typeorm/type-orm-custom.module';
import { RedisModule } from '@libs/database/src/redis/redis.module';
import { PrismaModule } from 'nestjs-prisma';

const domainModules = [UserModule];

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ClsModule.forRoot({ global: true, middleware: { mount: true } }),
    RedisModule,

    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        prismaOptions: {
          log: ['info', 'query'],
        },
        datasources: {
          db: {
            url: configService.get('mongo.connectHost', { infer: true }),
          },
        },
        explicitConnect: true,
      }),
      inject: [ConfigService],
    }),

    TypeOrmCustomModule.registerAsync(),
    SessionStoreModule.registerAsync(),
    HealthModule,
    AuthModule,
    ...domainModules,
  ],
  providers: [
    ServerErrorHandler,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class RootModule {}
