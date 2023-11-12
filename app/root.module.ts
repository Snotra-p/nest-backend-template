import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ClsModule } from 'nestjs-cls';
import { HealthModule } from '@libs/common/src/module/health-checker/health-module';
import { AllErrorHandler } from '@libs/common/src/error/all-error-handler';
import { AllExceptionFilter } from '@libs/common/src/filter/all-exception.filter';
import { RedisModule } from '@libs/database/src/redis/redis.module';
import { AuthModule } from '@libs/common/src/module/auth/auth.module';
import { SessionStoreModule } from '@libs/common/src/module/auth/session-store.module';
import { configModuleOptions } from '@config/configuration';
import { UserModule } from './user/user.module';
import { TypeOrmCustomModule } from '@libs/database/src/typeorm/type-orm-custom.module';

const domainModules = [UserModule];

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ClsModule.forRoot({ global: true, middleware: { mount: true } }),
    RedisModule,

    TypeOrmCustomModule.registerAsync(),
    SessionStoreModule.registerAsync(),
    HealthModule,
    AuthModule,
    ...domainModules,
  ],
  providers: [
    AllErrorHandler,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
  exports: [],
})
export class RootModule {}
