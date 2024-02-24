import {
  AbstractWsAdapter,
  MessageMappingProperties,
} from '@nestjs/websockets';
import { Server, ServerOptions, Socket } from 'socket.io';
import * as UWS from 'uWebSockets.js';
import {
  filter,
  first,
  fromEvent,
  map,
  mergeMap,
  Observable,
  share,
  takeUntil,
} from 'rxjs';
import { DISCONNECT_EVENT } from '@nestjs/websockets/constants';
import { isFunction, isNil } from '@nestjs/common/utils/shared.utils';
import { Collection, Document } from 'mongodb';
import { createAdapter } from '@socket.io/mongo-adapter';
import { Logger } from '@nestjs/common';

export class UwIoMongoAdapter extends AbstractWsAdapter {
  // private readonly uwsApp: UWS.TemplatedApp;
  private readonly mongoCollection: Collection<Document>;

  constructor(mongoClient: Collection<Document>) {
    super();
    // this.uwsApp = uwsApp;
    this.mongoCollection = mongoClient;
  }

  public createIOServer(port: number, options?: ServerOptions): Server {
    const uwsApp = UWS.App();
    const io = new Server(options);
    io.attachApp(uwsApp);
    io.adapter(createAdapter(this.mongoCollection));

    uwsApp.listen(port, (token: unknown) => {
      if (token) {
        Logger.log(`Server listening on port ${port}`);
      } else {
        Logger.warn('Failed to start server: port already in use');
      }
    });

    return io;
  }

  public create(
    port: number,
    options?: ServerOptions & { namespace?: string; server?: any },
  ): Server {
    return this.createIOServer(port, options);
  }

  public bindMessageHandlers(
    socket: Socket,
    handlers: MessageMappingProperties[],
    transform: (data: any) => Observable<any>,
  ): void {
    const disconnect$ = fromEvent(socket, DISCONNECT_EVENT).pipe(
      share(),
      first(),
    );

    handlers.forEach(({ message, callback }) => {
      const source$ = fromEvent(socket, message).pipe(
        mergeMap((payload: any) => {
          const { data, ack } = this.mapPayload(payload);
          return transform(callback(data, ack)).pipe(
            filter((response: any) => !isNil(response)),
            map((response: any) => [response, ack]),
          );
        }),
        takeUntil(disconnect$),
      );
      source$.subscribe(([response, ack]) => {
        if (response.event) {
          return socket.emit(response.event, response.data);
        }
        isFunction(ack) && ack(response);
      });
    });
  }

  public mapPayload(payload: unknown): { data: any; ack?: unknown } {
    if (!Array.isArray(payload)) {
      if (isFunction(payload)) {
        return { data: undefined, ack: payload as unknown };
      }
      return { data: payload };
    }
    const lastElement = payload[payload.length - 1];
    const isAck = isFunction(lastElement);
    if (isAck) {
      const size = payload.length - 1;
      return {
        data: size === 1 ? payload[0] : payload.slice(0, size),
        ack: lastElement,
      };
    }
    return { data: payload };
  }
}
