import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema'
import { CreateUserDto } from './create-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}


  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findOne(createUserDto.email)
    if (user) throw new BadRequestException('User already exist. Kindly login instead')

    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findOne(email: string): Promise<User> {
    const user = this.userModel.findOne({email}).exec();
    return user;
}
}