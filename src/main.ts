import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
  
  Logger.log('Server started on http://localhost:3001/', 'ExpressServer');
}

bootstrap();
