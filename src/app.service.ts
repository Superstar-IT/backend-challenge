import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private urlStore = new Map<string, string>();

  getHello(): string {
    return 'Hello World!';
  }

  generateCode(): string {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    const code = Array.from(
      { length: 10 },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join('');

    if (!this.urlStore.has(code)) return code;
    return this.generateCode();
  }

  async saveUrl(originalUrl: string): Promise<string> {
    const code = this.generateCode();
    await this.urlStore.set(code, originalUrl);

    return code;
  }

  async getUrl(code: string): Promise<string> {
    return this.urlStore.get(code) || null;
  }
}
