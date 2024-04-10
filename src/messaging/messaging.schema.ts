import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({timestamps: true})
export class Message {
  @Prop({ required: true })
  message: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  senderID: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

