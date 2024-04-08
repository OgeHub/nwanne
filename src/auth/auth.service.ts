import { Injectable, BadRequestException } from '@nestjs/common';
import {UsersService} from '../users/users.service';
import { User } from '../users/user.schema';
import { CreateUserDto } from '../users/create-user.dto';
import * as bcrypt from 'bcrypt';
import { generateJwtToken } from '../common/utils/jwt';
import { JwtToken } from '../common/interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.usersService.create(createUserDto);
    return newUser
  }

  async login(email: string, password: string): Promise<JwtToken> {
      const user: any = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user?.password))) {
      const accessToken = generateJwtToken(user?.id, user?.role, process.env.JWT_SECRET)
      return {accessToken}
    }

    throw new BadRequestException('Invalid credentials')
  }
}