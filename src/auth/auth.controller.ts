import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from '../users/create-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('users/sign-up')
 async signup(@Body() createUserDto: CreateUserDto) {
  await this.authService.signup(createUserDto);
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
}