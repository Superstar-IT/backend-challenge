import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketGateway } from './utils/gateways/socket/socket.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
