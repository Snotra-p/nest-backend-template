import { DynamicModule, Global, Inject, OnModuleDestroy } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@config/configuration';
import { DatabaseName } from '@libs/common/src/constants/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { DataSource } from 'typeorm';

const DATABASE_SOURCES = Symbol('DATABASE_SOURCES');
@Global()
export class TypeOrmCustomModule implements OnModuleDestroy {
  constructor(
    @Inject(DATABASE_SOURCES) private readonly dataSources: DataSource[],
  ) {}
  static registerAsync(): DynamicModule {
    return {
      module: TypeOrmCustomModule,
      global: true,
      imports: [
        TypeOrmModule.forRootAsync({
          name: DatabaseName.CORE,
          useFactory: (
            configService: ConfigService<EnvironmentVariables>,
          ): TypeOrmModuleOptions =>
            configService.get('database.core', { infer: true }),
          inject: [ConfigService],
        }),

        TypeOrmModule.forRootAsync({
          name: DatabaseName.ADMIN,
          useFactory: (
            configService: ConfigService<EnvironmentVariables>,
          ): TypeOrmModuleOptions =>
            configService.get('database.admin', { infer: true }),
          inject: [ConfigService],
        }),
      ],
      providers: [
        {
          provide: DATABASE_SOURCES,
          useFactory: (...dataSources: DataSource[]) => dataSources,
          inject: Object.values(DatabaseName).map((name) =>
            getDataSourceToken(name),
          ),
        },
      ],
      exports: [TypeOrmCustomModule],
    };
  }

  async onModuleDestroy(): Promise<void> {
    await Promise.all(
      this.dataSources.map((dataSource) => dataSource.destroy()),
    );
  }
}
