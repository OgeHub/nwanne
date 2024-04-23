import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './messaging.schema';
import { CreateMessageDto } from './create-message.dto';

@Injectable()
export class MessagingService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async create(
    senderID: string,
    message: CreateMessageDto['message'],
  ): Promise<Message> {
    const newMessage = new this.messageModel({ senderID, message });
    return newMessage.save();
  }
}
