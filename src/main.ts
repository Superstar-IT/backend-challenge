import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(new WsAdapter(app));
  app.enableCors({ origin: '*' });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const swaggerDocConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('This is API documentation.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const apiDoc = SwaggerModule.createDocument(app, swaggerDocConfig, {
    include: [AppModule],
  });

  SwaggerModule.setup('api/v1/document', app, apiDoc);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
