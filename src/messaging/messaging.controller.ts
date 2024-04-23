import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MessagingService } from './messaging.service';
import { MessagingGateway } from './messaging.gateway';
import { CreateMessageDto } from './create-message.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('messaging')
export class MessagingController {
  constructor(
    private messagingService: MessagingService,
    private messagingGateway: MessagingGateway,
  ) {}

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard)
  @Post('send')
  async create(@Request() req, @Body() createMessageDto: CreateMessageDto) {
    const { id } = req.user;

    const newMessage = await this.messagingService.create(
      id,
      createMessageDto.message,
    );

    this.messagingGateway.handleMessage(newMessage);

    return {
      status: 'success',
      message: 'Message sent successfully',
    };
  }
}
