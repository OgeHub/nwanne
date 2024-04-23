import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findByEmail(createUserDto.email);
    if (user)
      throw new BadRequestException('User already exist. Kindly login instead');

    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findById(id: string): Promise<User | null> {
    const user = this.userModel.findOne({ _id: id }).exec();
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.userModel.findOne({ email }).select('+password').exec();
    return user;
  }
}
