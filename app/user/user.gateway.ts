import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as console from 'console';

@WebSocketGateway(8081, {
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
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

  handleConnection(client: Socket, ...args: any[]): any {
    console.log(client.connected);
    console.log(args);
    console.log('client connected');
  }

  handleDisconnect(client: Socket): any {
    console.log(client);
    console.log('client disconnected');
  }
}
