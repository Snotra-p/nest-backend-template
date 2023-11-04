import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ClsModule } from 'nestjs-cls';

import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';
import { configModuleOptions } from '@config/configuration';
import { TypeOrmCustomModule } from '@libs/database/typeorm/type-orm-custom.module';
import { AllErrorHandler } from '@libs/common/error/all-error-handler';
import { AllExceptionFilter } from '@libs/common/filter/all-exception.filter';

const domainModules = [UserModule];

@Module({
  imports: [
    ClsModule.forRoot({ global: true, middleware: { mount: true } }),
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmCustomModule,
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
