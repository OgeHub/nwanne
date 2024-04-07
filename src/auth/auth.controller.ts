import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admins/create-admin.dto'
import { CreateUserDto, LoginDto } from '../users/create-user.dto'
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('users/sign-up')
 async signUpUser(@Body() createUserDto: CreateUserDto) {
  await this.authService.sighUpUser(createUserDto);
    return {
      status: 'success',
      message: 'Sign-up successful'
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('admins/sign-up')
  async signUpAdmin(@Body() createAdminDto: CreateAdminDto) {
   await this.authService.signUpAdmin(createAdminDto);
    return {
      status: 'success',
      message: 'Sign-up successful'
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const {accessToken} = await this.authService.login(loginDto.email, loginDto.password)
    return {
      status: 'success',
      message: 'Login successful',
      accessToken
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const user = req.user;
    return {
      status: 'success',
      message: 'Profile retrieved successfully',
      data: user
    };
}
}