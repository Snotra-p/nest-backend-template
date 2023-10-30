import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from '../libs/common/filter/all-exception.filter';
import { AllErrorHandler } from '../libs/common/error/all-error-handler';
import * as config from '../config/configuration';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    UserModule,
    ShopModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/.${process.env.NODE_ENV}.env`,
      load: [config.configuration],
      validationSchema: config.validationSchema,
    }),
  ],
  controllers: [AppController],
  providers: [
    AllErrorHandler,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
  exports: [],
})
export class AppModule {}
