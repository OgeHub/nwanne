import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';


@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot(process.env.MONGO_URI), AdminsModule],
  controllers: [],
})
export class AppModule {}
