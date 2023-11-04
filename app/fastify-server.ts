import { Logger } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@config/configuration';
import { NODE_ENVIRONMENT } from '@config/constants';
import compression from '@fastify/compress';
import secureSession from '@fastify/secure-session';

export class FastifyServer {
  private app: NestFastifyApplication;

  async init(): Promise<void> {
    this.app = await NestFactory.create<NestFastifyApplication>(
      RootModule,
      new FastifyAdapter(),
    );

    const configService = this.app.get(ConfigService<EnvironmentVariables>);

    if (configService.get('env', { infer: true }) !== NODE_ENVIRONMENT.PROD) {
      const swaggerConfig = new DocumentBuilder()
        .setTitle('star Server')
        .setDescription('API description')
        .setVersion('1.0')
        .addBearerAuth(
          {
            type: 'http',
            name: 'Authorization',
            in: 'header',
            description: 'Bearer token',
          },
          'basic',
        )
        .build();
      const document = SwaggerModule.createDocument(this.app, swaggerConfig);
      SwaggerModule.setup('api-docs', this.app, document, {
        swaggerOptions: {
          persistAuthorization: true,
        } as SwaggerCustomOptions,
      });
    }

    // confirm secret string from secret-key file
    // Logger.log(this.getSecretKeys());

    await this.app.register(compression, {
      encodings: ['gzip', 'deflate'],
    });

    await this.app.register(secureSession, {
      key: configService.get('sessionKeys', { infer: true }),
      cookie: {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict', // csrf protection
        maxAge: 86400000, // 1 day
      },
    });
  }

  async run(): Promise<void> {
    Logger.log(`NODE_ENV is ${process.env.NODE_ENV}`);
    Logger.log(`running in ${process.env.HOST_IP}:${process.env.HOST_PORT}`);
    await this.app.listen(Number(process.env.HOST_PORT), process.env.HOST_IP);
  }

  async close(): Promise<void> {
    await this.app.close();
  }

  // ref : https://github.com/fastify/fastify-secure-session
  // getSecretKeys(): string {
  //   const keyBuffer = fs.readFileSync('secret-key');
  //   return keyBuffer.toString('hex');
  // }
}
