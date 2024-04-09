import { Controller, UseGuards, Get, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

// import {UsersService} from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor() {}

    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth('Authorization')
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
