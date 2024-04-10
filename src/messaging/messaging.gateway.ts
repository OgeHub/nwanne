import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server} from 'socket.io';

@WebSocketGateway()
export class MessagingGateway implements OnModuleInit {

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    })
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any) {
    this.server.emit('onMessage', data)
  }
}
