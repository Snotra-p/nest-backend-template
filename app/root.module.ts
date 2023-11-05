import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ClsModule } from 'nestjs-cls';

import { UserModule } from './user/user.module';
import { HealthModule } from '@libs/health-checker/src/health-module';
import {
  configModuleOptions,
  EnvironmentVariables,
} from '@config/configuration';
import { AllErrorHandler } from '@libs/common/src/error/all-error-handler';
import { AllExceptionFilter } from '@libs/common/src/filter/all-exception.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_NAME } from '@libs/common/src/constants/config';

const domainModules = [UserModule];

@Module({
  imports: [
    ClsModule.forRoot({ global: true, middleware: { mount: true } }),
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<EnvironmentVariables>) =>
        configService.get('database')[DATABASE_NAME.COMMON],
      inject: [ConfigService],
    }),
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
