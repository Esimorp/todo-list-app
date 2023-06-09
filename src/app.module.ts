import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_SYNCHRONIZE,
  DATABASE_TYPE,
  DATABASE_TYPES,
  DATABASE_USER,
} from './common';
import { TodoListModule } from './todo-list/todo-list.module';
import { UserModule } from './user/user.module';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards';
import { JwtModule } from '@nestjs/jwt';
import { AppExceptionsFilter } from './filters/app-exceptions.filter';

@Module({
  imports: [
    JwtModule,
    ConfigModule.forRoot({
      envFilePath: ['./working-dir/env/.env.local', './working-dir/env/.env'],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'en-*': 'en',
        'zh-*': 'zh',
      },
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<DATABASE_TYPES>(DATABASE_TYPE),
          port: configService.get<number>(DATABASE_PORT),
          host: configService.get<string>(DATABASE_HOST),
          username: configService.get<string>(DATABASE_USER),
          password: configService.get<string>(DATABASE_PASSWORD),
          database: configService.get<string>(DATABASE_NAME),
          autoLoadEntities: true,
          synchronize:
            configService.get<string>(DATABASE_SYNCHRONIZE) === 'true',
        };
      },
    }),
    TodoListModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AppExceptionsFilter,
    },
  ],
})
export class AppModule {}
