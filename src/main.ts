import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_RUNNING_PORT, logger } from './common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logger('todolist-app', './working-dir/logs'),
  });
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>(APP_RUNNING_PORT);

  await app.listen(port);
}

bootstrap();
