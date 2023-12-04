// import { INestApplication, Logger } from '@nestjs/common';
// import {
//   DocumentBuilder,
//   SwaggerCustomOptions,
//   SwaggerModule,
// } from '@nestjs/swagger';
// import * as compression from 'compression';
// import { NestFactory } from '@nestjs/core';
// import { RootModule } from './root.module';
//
// // not implement yet
// export class ExpressServer {
//   app: INestApplication<any> | undefined;
//   constructor() {}
//
//   async init(): Promise<void> {
//     this.app = await NestFactory.create(RootModule);
//
//     if (process.env.NODE_ENV !== 'prod') {
//       const config = new DocumentBuilder()
//         .setTitle('star Server')
//         .setDescription('API description')
//         .setVersion('1.0')
//         .addBasicAuth(
//           {
//             type: 'http',
//             name: 'Authorization',
//             in: 'header',
//             description: 'Username:userId & Password:sessionId',
//           },
//           'basic',
//         )
//         .build();
//       const document = SwaggerModule.createDocument(this.app, config);
//       SwaggerModule.setup('api-docs', this.app, document, {
//         swaggerOptions: {
//           persistAuthorization: true,
//         } as SwaggerCustomOptions,
//       });
//     }
//
//     this.app.use(compression());
//   }
//
//   async run(): Promise<void> {
//     Logger.log(`NODE_ENV is ${process.env.NODE_ENV}`);
//     Logger.log(`running in ${process.env.HOST_IP}:${process.env.HOST_PORT}`);
//     if (!this.app) {
//       throw new Error('app is undefined');
//     }
//     await this.app.listen(Number(process.env.HOST_PORT));
//   }
//
//   async close(): Promise<void> {
//     await this.app!.close();
//   }
// }
