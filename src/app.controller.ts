import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SocketGateway } from './utils/gateways/socket/socket.gateway';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly gateway: SocketGateway,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':code')
  async getURL(@Param('code') code: string) {
    const originalUrl = await this.appService.getUrl(code);
    if (!originalUrl) throw new NotFoundException('URL not found');
    return { url: originalUrl };
  }

  @Post('url')
  async saveURL(@Body('url') url: string) {
    const code = await this.appService.saveUrl(url);
    const shortenedUrl = `http://localhost:4000/${code}`;
    this.gateway.sendShortenedUrl(shortenedUrl);
  }
}
