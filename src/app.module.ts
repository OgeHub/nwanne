import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    MessagingModule,
  ],
  controllers: [],
})
export class AppModule {}
