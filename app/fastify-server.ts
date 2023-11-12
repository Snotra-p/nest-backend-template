import { RootModule } from './root.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import compression from '@fastify/compress';
import { Logger } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { EnvironmentVariables } from '@config/configuration';
import { NodeEnvironment } from '@libs/common/src/constants/config';

export class FastifyServer {
  private app: NestFastifyApplication;

  async init(): Promise<void> {
    this.app = await NestFactory.create<NestFastifyApplication>(
      RootModule,
      new FastifyAdapter(),
    );

    const configService = this.app.get(ConfigService<EnvironmentVariables>);

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
    const configService = this.app.get(ConfigService<EnvironmentVariables>);
    const ip = configService.get('ip', { infer: true });
    const port = configService.get('port', { infer: true });

    await this.app.listen(port, ip).then(() => {
      Logger.log(`NODE_ENV is ${configService.get('env', { infer: true })}`);
      Logger.log(`running in ${ip}:${port}`);
    });
  }

  async close(): Promise<void> {
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

    const document = SwaggerModule.createDocument(this.app, swaggerConfig);
    SwaggerModule.setup('api-docs', this.app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      } as SwaggerCustomOptions,
    });
  }
}
