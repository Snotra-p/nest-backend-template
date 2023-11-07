import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ClsModule } from 'nestjs-cls';

import { UserModule } from './user/user.module';
import { HealthModule } from '@libs/common/src/module/health-checker/health-module';
import { configModuleOptions } from '@config/configuration';
import { AllErrorHandler } from '@libs/common/src/error/all-error-handler';
import { AllExceptionFilter } from '@libs/common/src/filter/all-exception.filter';
import { RedisModule } from '@libs/database/src/redis/redis.module';
import { TypeOrmCustomModule } from '@libs/database/src/typeorm/type-orm-custom.module';

const domainModules = [UserModule];

@Module({
  imports: [
    ClsModule.forRoot({ global: true, middleware: { mount: true } }),
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmCustomModule,
    RedisModule,
    HealthModule,
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
