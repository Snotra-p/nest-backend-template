import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8081, {
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class UserGateway {
  @WebSocketServer()
  server: Server | undefined;
  constructor() {}

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: string): Promise<any> {
    console.log('identity', data);
    return {
      event: 'identity',
      data: data,
    };
  }
}
