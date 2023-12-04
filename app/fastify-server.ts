import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import compression from '@fastify/compress';
import { Logger } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { EnvironmentVariables } from '@config/configuration';
import {
  DatabaseName,
  NodeEnvironment,
} from '@libs/common/src/constants/config';
import { SwaggerUiOptions } from '@nestjs/swagger/dist/interfaces/swagger-ui-options.interface';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSourceManager } from '@libs/database/src/typeorm/data-source-manager';

export class FastifyServer {
  private app: NestFastifyApplication | undefined;

  async init(app: NestFastifyApplication): Promise<void> {
    this.app = app;
    if (!this.app) {
      throw new Error('app is undefined');
    }

    const configService = this.app.get(ConfigService<EnvironmentVariables>);
    Object.values(DatabaseName)
      .map((dbName) => this.app!.get(getDataSourceToken(dbName)))
      .filter((dataSource) => !!dataSource)
      .forEach((dataSource) => {
        DataSourceManager.setDataSource(dataSource);
      });

    if (configService.get('env', { infer: true }) !== NodeEnvironment.PROD) {
      this._initSwaggerSettings(configService);
    }

    // confirm secret string from secret-key file
    // Logger.log(this.getSecretKeys());

    await this.app.register(compression, {
      encodings: ['gzip', 'deflate'],
    });
  }

  async run(): Promise<void> {
    if (!this.app) {
      throw new Error('app is undefined');
    }

    const configService = this.app.get(ConfigService<EnvironmentVariables>);
    const ip = configService.get<number>('ip', { infer: true });
    const port = configService.get<number>('port', { infer: true });

    await this.app.listen(port, ip).then(() => {
      Logger.log(`NODE_ENV is ${configService.get('env', { infer: true })}`);
      Logger.log(`running in ${ip}:${port}`);
    });
  }

  async close(): Promise<void> {
    if (!this.app) {
      throw new Error('app is undefined');
    }
    await this.app.close();
  }

  private _initSwaggerSettings(
    configService: ConfigService<EnvironmentVariables>,
  ): void {
    const swaggerBuilder = new DocumentBuilder()
      .setTitle('star Server')
      .setDescription('API description')
      .setVersion('1.0')
      .addSecurity(
        configService.get('env') === NodeEnvironment.DEV ? 'bearer' : 'apiKey',
        configService.get('env') === NodeEnvironment.DEV
          ? { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
          : { type: 'apiKey', name: 'token', in: 'header' },
      );

    const swaggerConfig = swaggerBuilder.build();

    if (!this.app) {
      throw new Error('app is undefined');
    }

    const document = SwaggerModule.createDocument(this.app, swaggerConfig);
    SwaggerModule.setup('api-docs', this.app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      } as SwaggerUiOptions | SwaggerCustomOptions,
    });
  }
}
