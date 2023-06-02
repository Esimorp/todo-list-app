import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_RUNNING_PORT, logger } from './common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logger('todolist-app', './working-dir/logs'),
  });
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>(APP_RUNNING_PORT);

  const config = new DocumentBuilder()
    .setTitle('Todolist App')
    .setDescription('RESTFUL API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen(port);
}

bootstrap();
