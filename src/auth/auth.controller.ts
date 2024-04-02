import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admins/create-admin.dto'
import { CreateUserDto } from '../users/create-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('users/sign-up')
  signUpUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.sighUpUser(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('admins/sign-up')
  signUpAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signUpAdmin(createAdminDto);
  }
}