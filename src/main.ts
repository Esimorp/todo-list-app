import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logger('todolist-app', './working-dir/logs'),
  });
  await app.listen(3000);
}

bootstrap();
