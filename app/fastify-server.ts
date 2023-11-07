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
import { NODE_ENVIRONMENT } from '@libs/common/src/constants/config';
import compression from '@fastify/compress';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
import { Logger } from '@nestjs/common';

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

    await this.app.register(fastifyCookie);
    await this.app.register(fastifySession, {
      secret: configService.get('sessionKeys', { infer: true }),
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
    await this.app
      .listen(Number(process.env.HOST_PORT), process.env.HOST_IP)
      .then(() => {
        Logger.log(`NODE_ENV is ${process.env.NODE_ENV}`);
        Logger.log(
          `running in ${process.env.HOST_IP}:${process.env.HOST_PORT}`,
        );
      });
  }

  async close(): Promise<void> {
    await this.app.close();
  }

  // ref : https://github.com/fastify/fastify-secure-session
  // getSecretKeys(): string {
  //   const keyBuffer = fs.readFileSync('secret-key');
  //   return keyBuffer.toString('hex');
  // }
  // secret key is created by  fastify-secure-session
}
