import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class MessagingGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string): string {
    return data;
  }
}
