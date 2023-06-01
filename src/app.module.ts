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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./working-dir/env/.env.local', './working-dir/env/.env'],
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
