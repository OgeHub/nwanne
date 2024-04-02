import { Injectable } from '@nestjs/common';
import {UsersService} from '../users/users.service';
import { AdminsService } from '../admins/admins.service';
import { Admin}  from '../admins/admin.schema'
import { User } from '../users/user.schema'
import { CreateAdminDto } from '../admins/create-admin.dto'
import { CreateUserDto } from '../users/create-user.dto'
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private adminsService: AdminsService) {}

  async sighUpUser(createUserDto: CreateUserDto): Promise<User> {
    // Check if user exist
    
    const newUser = this.usersService.create(createUserDto);
    return newUser
  }

  async signUpAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const newUser = this.adminsService.create(createAdminDto);
    return newUser
  }
}