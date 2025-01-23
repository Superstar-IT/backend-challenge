import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'ws';

@WebSocketGateway(8080)
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  private pendingDeliveries = new Map<string, string>();

  sendShortenedUrl(shortenedUrl: string): void {
    this.server.clients.forEach((client: Socket) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ shortenedURL: shortenedUrl }));
        this.pendingDeliveries.set(shortenedUrl, 'pending');
      }
    });
  }

  handleAcknowledgment(client: Socket, shortenedUrl: string): void {
    this.pendingDeliveries.delete(shortenedUrl);
    client.send(
      JSON.stringify({ status: 'Acknowledged', shortenedURL: shortenedUrl }),
    );
  }

  handleConnection(client: Socket): void {
    client.on('message', (message: string) => {
      const data = JSON.parse(message);
      if (data.type === 'acknowledgment' && data.shortenedURL) {
        this.handleAcknowledgment(client, data.shortenedURL);
      }
    });
  }

  handleDisconnect(client: Socket): void {
    console.log('Client disconnected');
  }
}
