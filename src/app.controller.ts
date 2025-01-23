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
import { ApiOkResponse } from '@nestjs/swagger';
import { URL } from './dtos/url.dto';

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
  @ApiOkResponse({ type: URL })
  async getURL(@Param('code') code: string): Promise<URL> {
    const originalUrl = await this.appService.getUrl(code);
    if (!originalUrl) throw new NotFoundException('URL not found');
    return { url: originalUrl };
  }

  @Post('url')
  async saveURL(@Body() body: URL): Promise<void> {
    const { url } = body;
    const code = await this.appService.saveUrl(url);
    const shortenedUrl = `http://localhost:4000/${code}`;
    this.gateway.sendShortenedUrl(shortenedUrl);
  }
}
