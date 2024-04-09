import { Controller, UseGuards, Post, Request, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MessagingService } from './messaging.service';
import { CreateMessageDto } from './create-message.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('messaging')
export class MessagingController {
    constructor(private messagingService: MessagingService) {}

    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth('Authorization')
    @UseGuards(AuthGuard)
    @Post('send/:receiverID')
    async create(@Request() req, @Param() params: any, @Body() createMessageDto: CreateMessageDto) {
      const {id} = req.user;
      
     await this.messagingService.create(id, params.receiverID, createMessageDto.message);
    
      return {
        status: 'success',
        message: 'Message sent successfully',
      };
    }
}
