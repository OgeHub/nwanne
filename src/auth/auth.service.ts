import { Injectable, BadRequestException } from '@nestjs/common';
import {UsersService} from '../users/users.service';
import { AdminsService } from '../admins/admins.service';
import { Admin}  from '../admins/admin.schema'
import { User } from '../users/user.schema';
import { CreateAdminDto } from '../admins/create-admin.dto'
import { CreateUserDto } from '../users/create-user.dto';
import * as bcrypt from 'bcrypt';
import { generateJwtToken } from '../common/utils/jwt';
import { JwtToken } from '../common/interfaces/jwt.interface';

// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, 
    private adminsService: AdminsService) {}

  async sighUpUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.usersService.create(createUserDto);
    return newUser
  }

  async signUpAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const newUser = await this.adminsService.create(createAdminDto);
    return newUser
  }

  async login(email: string, password: string): Promise<JwtToken> {
    let user: any
    if (await this.usersService.findByEmail(email)) {
      user = await this.usersService.findByEmail(email);
    } else if (await this.adminsService.findByEmail(email)) {
      user = await this.adminsService.findByEmail(email);
    }

    if (user && (await bcrypt.compare(password, user?.password))) {
      const accessToken = generateJwtToken(user?.id, user?.role, process.env.JWT_SECRET)
      return {accessToken}
    }

    throw new BadRequestException('Invalid credentials')
  }
}